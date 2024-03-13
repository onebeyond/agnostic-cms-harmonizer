// Copyright (c) One Beyond. All rights reserved. Licensed under the MIT license.

import { createClient } from 'contentful';

import {
  type ContentfulClientParams,
  type ContentfulEntry,
  type ContentfulGetEntriesParams,
  type ContentfulGetEntryParams,
  type ContentfulClientApi,
  type HarmonizedOutput,
  type ContentfulEntrySkeleton,
} from '../@types';
import { AbstractProvider } from '../index.abstract';
import { HarmonizedClient } from '../index';

type ContentfulResource =
  (typeof ContentfulClient.CF_RESOURCE)[keyof typeof ContentfulClient.CF_RESOURCE];

/**
 * The Contentful client that extends the {@link HarmonizedClient}.
 *
 * @remarks
 * This class offers a foundational implementation for initializing the Contentful client
 * instance and accessing it.
 *
 * It provides the provider-specific methods for making requests to the Contentful client
 * and harmonizing the entry and collection data to produce {@link HarmonizedOutput | HarmonizedOutput}.
 *
 * The Contetful CLI provides a utility for generating TypeScript types from the Contentful
 * content models. This document does not cover the process of generating the TypeScript types
 * from the Contentful content models, but you can find more information about it in the
 * Contentful [documentation](https://www.npmjs.com/package/contentful-typescript-codegen).
 *
 * @example
 * ```ts
 * import { ContentfulClient } from '@onebeyond/agnostic-cms-harmonizer';
 *
 * const client = new ContentfulClient({
 *   accessToken,
 *   space,
 *   environment,
 * });
 *
 * await client.init();
 *
 * const entry = await client.getEntry<MyEntry>({ entryId: '123' });
 * console.log(entry); // { data: { title: 'My title', description: 'My description' } }
 */
export class ContentfulClient extends HarmonizedClient implements AbstractProvider {
  constructor(clientParams: ContentfulClientParams) {
    super(clientParams);
  }

  /**
   * The Contentful resource types.
   *
   * @remarks
   * The Contentful resource types are used to identify the type of the resource
   * returned from the Contentful client.
   */
  public static CF_RESOURCE = {
    ASSET: 'Asset',
    ENTRY: 'Entry',
    LINK: 'Link',
  } as const;

  /**
   * {@inheritDoc index.HarmonizedClient#initialize}
   */
  public async init() {
    await this.initialize<ContentfulClientApi<undefined>>(async () =>
      createClient(this.clientParams),
    );
  }

  /**
   * Implementation of the Contentful variant of {@link AbstractProvider.getEntry | getEntry} method.
   *
   * @param config - The configuration object for the getEntry method.
   *
   * @remarks
   * The getEntry method serves to retrieve a single entry from the Contentful client. It takes the
   * entry ID along with any supplementary configuration options supported by the Contentful client.
   *
   * This method returns a promise that resolves to the entry data formatted in a harmonized manner.
   *
   * @example
   * type MyEntry = {
   *   title: string;
   *   description: string;
   * }
   *
   * const entry = await client.getEntry<MyEntry>({ entryId: '123', locale: 'en-US' });
   * console.log(entry); // { data: { title: 'My title', description: 'My description' } }
   */
  public async getEntry<T = Record<string, unknown>>({
    entryId,
    locale,
    nestedLevels = 10,
    ...config
  }: ContentfulGetEntryParams): Promise<HarmonizedOutput<T>> {
    return this.harmonizeEntry<T>(
      () =>
        this.getClientInstance().getEntry<ContentfulEntrySkeleton<T>>(entryId, {
          ...config,
          locale,
          include: nestedLevels,
        }),
      <(data: T) => HarmonizedOutput<T>>this.parseItem.bind(this),
    );
  }

  /**
   * Implementation of the Contentful variant of {@link AbstractProvider.getCollection | getCollection} method.
   *
   * @param config - The configuration object for the getEntries method.
   *
   * @remarks
   * The getCollection method serves to retrieve a collection of entries from the Contentful client. It takes the
   * content_type (collectionId) paramter along with any supplementary configuration options supported by the
   * Contentful client.
   *
   * This method returns a promise that resolves to the collection data formatted in a harmonized manner.
   *
   * @example
   * type MyEntry = {
   *   title: string;
   *   description: string;
   * }
   *
   * const entries = await client.getCollection<MyEntry>({ collectionId: '123', locale: 'en-US' });
   * console.log(entries); // { data: [{ title: 'My title', description: 'My description' }, ...] }
   */
  public async getCollection<T = Record<string, unknown>>({
    collectionId,
    locale,
    nestedLevels = 10,
    ...config
  }: ContentfulGetEntriesParams<T>): Promise<HarmonizedOutput<T[]>> {
    return this.harmonizeCollection<T>(
      () =>
        this.getClientInstance()
          .getEntries<ContentfulEntrySkeleton<T>>({
            ...config,
            locale,
            content_type: collectionId,
            include: nestedLevels,
          })
          .then(({ items }) => items as ContentfulEntry<T>[]),
      <(data: T[]) => HarmonizedOutput<T[]>>this.parseItem.bind(this),
    );
  }

  private parseItem<T = Record<string, unknown>>(
    payload: ContentfulEntry<T> | ContentfulEntry<T>[],
  ): HarmonizedOutput<T> | HarmonizedOutput<T[]> {
    return {
      data:
        !Array.isArray(payload) ?
          this.mapItem<T>(payload)
        : payload.reduce(
            (items, item) => (item ? items.concat(this.mapItem<T>(item)) : items),
            Array(0) as T[],
          ),
    } as HarmonizedOutput<T> | HarmonizedOutput<T[]>;
  }

  private mapItem<T = Record<string, unknown>>(item: ContentfulEntry<T>): T {
    return (
      {
        [ContentfulClient.CF_RESOURCE.ASSET]:
          Object(item.fields?.file)?.url ? `https:${Object(item.fields.file).url}` : null,

        [ContentfulClient.CF_RESOURCE.LINK]: Object.assign(Object.create(null), {
          id: Object(item).sys?.id,
        }),
        [ContentfulClient.CF_RESOURCE.ENTRY]: Object.entries(Object(item).fields || {}).reduce(
          (acc, [key, value]) => {
            if (Array.isArray(value)) {
              return {
                ...acc,
                [key]: value.map((valueItem) => this.mapItem(valueItem || Object.create(null))),
              };
            }
            return {
              ...acc,
              [key]: this.mapItem(value || Object.create(null)),
            };
          },
          Object.create(null),
        ),
      }[(Object(item || {}).sys?.type || '') as ContentfulResource] || item
    );
  }
}
