import {
  createClient,
  type CreateClientParams,
  type ContentfulClientApi,
  type Entry,
  type EntrySkeletonType,
  type EntryQueries,
  type FieldsType,
  type ChainModifiers,
  EntriesQueries,
} from 'contentful';

import { HarmonizedOutput } from '../@types';
import {
  AbstractAgnosticCMSHarmonizerClient,
  AbstractGetEntriesParams,
  AbstractGetEntryParams,
} from '../index.abstract';

/**
 * Type of entries that can be retrieved
 * @internal
 */
const ContentfulResourceType = {
  ASSET: 'Asset',
  ENTRY: 'Entry',
  LINK: 'Link',
} as const;

export type ContentfulEntry<T> = Entry<EntrySkeletonType<T & FieldsType>, undefined, string>;

export type ContentfulEntrySkeleton<T> = EntrySkeletonType<T & FieldsType>;

export type ContentfulGetEntryParams = AbstractGetEntryParams &
  EntryQueries<ChainModifiers> & {
    locale?: string;
    nestedLevels?: 0 | 2 | 1 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  };

export type ContentfulGetEntriesParams<T> = AbstractGetEntriesParams &
  EntriesQueries<ContentfulEntrySkeleton<T>, ChainModifiers> & {
    locale?: string;
    nestedLevels?: 0 | 2 | 1 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  };

/**
 * Contentful provider.
 */
export class HarmonizerContentfulClient extends AbstractAgnosticCMSHarmonizerClient {
  /**
   * @param clientParams {@link https://contentful.github.io/contentful.js/contentful/10.6.21/interfaces/CreateClientParams.html}
   */
  constructor(clientParams: CreateClientParams) {
    super(clientParams);
    this.clientInstance = Object.create(null);
  }

  public async initialize(): Promise<void> {
    this.clientInstance = await this.agnosticCmsInitialize(async () =>
      createClient(this.clientParams),
    );
  }

  /**
   * {@link AbstractAgnosticCMSHarmonizerClient#getEntry}
   * @param {ContentfulGetEntryParams} params
   * @remarks
   * By providing the `entryId` parameter, you can fetch the data for a specific _Contentful entry_.
   * Additionally, you can optionally specify the `locale` and `nestedLevels` parameters.
   * The `nestedLevels` parameter determines the depth of _reference resolution_ in the entry and
   * has a default value of __10__. You can also specify the expected data type by using a _type argument_.
   * @returns {Promise<HarmonizedOutput<T>>}
   * @example
   * type MyEntry = {
   *  title: string;
   *  description: string;
   * }
   *
   * const client = await (new HarmonizerContentfulClient({...})).initialize();
   * const entry = await client.getEntry<MyEntry>({ entryId: '123', locale: 'en-US' });
   * console.log(entry); // { data: { title: 'My title', description: 'My description' } }
   */
  public async getEntry<T = Record<string, unknown>>({
    entryId,
    locale,
    nestedLevels = 10,
  }: ContentfulGetEntryParams): Promise<HarmonizedOutput<T>> {
    const query = {
      locale,
      include: nestedLevels,
    };

    return await this.getEntryHarmonized<T>(
      <() => Promise<T>>this.getEntryHandler?.bind(this, entryId, query),
      <(data: T) => HarmonizedOutput<T>>this.parserHandler.bind(this),
    );
  }

  public async getEntries<T = Record<string, unknown>>({
    collectionId,
    locale,
    nestedLevels = 10,
    ...config
  }: ContentfulGetEntriesParams<T>): Promise<HarmonizedOutput<T[]>> {
    const query = {
      ...config,
      locale,
      content_type: collectionId,
      include: nestedLevels,
    };
    return await this.getEntriesHarmonized<T>(
      <() => Promise<T[]>>this.getEntriesHandler?.bind(this, query),
      <(data: T[]) => HarmonizedOutput<T[]>>this.parserHandler.bind(this),
    );
  }

  protected clientInstance: ContentfulClientApi<undefined>;

  protected getClientInstance(): ContentfulClientApi<undefined> {
    return this.clientInstance;
  }

  private async getEntryHandler<T = Record<string, unknown>>(
    entryId: string,
    query?: EntryQueries<undefined>,
  ): Promise<ContentfulEntry<T>> {
    return this.getClientInstance().getEntry<ContentfulEntrySkeleton<T>>(entryId, query);
  }

  private async getEntriesHandler<T = Record<string, unknown>>(
    query?: EntriesQueries<ContentfulEntrySkeleton<T>, undefined>,
  ): Promise<ContentfulEntry<T>[]> {
    const entries = await this.getClientInstance().getEntries<ContentfulEntrySkeleton<T>>(query);
    return entries.items;
  }

  private parserHandler<T = Record<string, unknown>>(
    payload: ContentfulEntry<T> | ContentfulEntry<T>[],
  ): HarmonizedOutput<string | ContentfulEntry<T> | ContentfulEntry<T>[] | null> {
    if (Array.isArray(payload)) {
      return {
        data: payload.reduce((items, item) => {
          return item ? items.concat(this.mapper<T>(item)) : items;
        }, Array(0)),
      };
    }

    return { data: this.mapper<T>(payload) };
  }

  private mapper<T = Record<string, unknown>>(
    item: ContentfulEntry<T>,
  ): string | ContentfulEntry<T> | null {
    switch (item?.sys?.type + '') {
      case ContentfulResourceType.ENTRY:
        return Object.entries(item.fields).reduce((acc, [key, value]) => {
          if (Array.isArray(value)) {
            return {
              ...acc,
              [key]: value.map((valueItem) => this.mapper<T>(valueItem || Object.create(null))),
            };
          }
          return {
            ...acc,
            [key]: this.mapper<T>(value || Object.create(null)),
          };
        }, Object.create(null));

      case ContentfulResourceType.ASSET:
        return Object(item.fields?.file)?.url ? `https:${Object(item.fields.file).url}` : null;

      case ContentfulResourceType.LINK:
        return Object.assign(Object.create(null), { id: item.sys.id });

      default:
        return item;
    }
  }
}
