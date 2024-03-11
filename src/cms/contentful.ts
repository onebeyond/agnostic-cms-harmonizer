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
 * @summary
 * The Contentful client that extends the {@link HarmonizedClient}.
 */
export class ContentfulClient extends HarmonizedClient implements AbstractProvider {
  constructor(clientParams: ContentfulClientParams) {
    super(clientParams);
  }

  /**
   * @summary
   * The Contentful resource types.
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
   * {@link AbstractProvider.getEntry}
   * @param {ContentfulGetEntryParams} params
   * @example
   * type MyEntry = {
   *  title: string;
   *  description: string;
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
          locale,
          include: nestedLevels,
          ...config,
        }),
      <(data: T) => HarmonizedOutput<T>>this.parseItem.bind(this),
    );
  }

  /**
   * {@link AbstractProvider.getCollection}
   * @param {ContentfulGetEntriesParams} params
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
