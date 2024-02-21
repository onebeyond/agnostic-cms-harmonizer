import {
  createClient,
  type CreateClientParams,
  type ContentfulClientApi,
  type Entry,
  type EntrySkeletonType,
  type EntryQueries,
  type FieldsType,
  type ChainModifiers,
} from 'contentful';

import { HarmonizedOutput } from '../@types';
import { AbstractAgnosticCMSHarmonizerClient, AbstractGetEntryParams } from '../index.abstract';

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

/**
 * Contentful provider.
 */
export class HarmonizerContentfulClient extends AbstractAgnosticCMSHarmonizerClient {
  constructor(clientParams: CreateClientParams) {
    super(clientParams);
    this.clientInstance = Object.create(null);
  }

  /**
   * Initializes the Contentful client instance.
   */
  public async initialize(): Promise<void> {
    this.clientInstance = await this.agnosticCmsInitialize(async () =>
      createClient(this.clientParams),
    );
  }

  /**
   * Returns the typed harmonizer response from an entry request.
   * @param {ContentfulGetEntryParams} params
   * @remarks
   * By providing the `entryId` parameter, you can fetch the data for
   * a specific _Contentful entry_.
   * Additionally, you can optionally specify the `locale` and `nestedLevels` parameters.
   * The `nestedLevels` parameter determines the depth of _reference resolution_ in the
   * entry and has a default value of __10__. You can also specify the expected data type
   * by using a _type argument_.
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

  private parserHandler<T = Record<string, unknown>>(
    payload: ContentfulEntry<T>,
  ): HarmonizedOutput<string | ContentfulEntry<T>> {
    const output = this.mapper<T>(payload);
    return { data: output };
  }

  private mapper<T = Record<string, unknown>>(
    item: ContentfulEntry<T>,
  ): string | ContentfulEntry<T> {
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
        return `https:${Object(item.fields?.file)?.url}`;

      case ContentfulResourceType.LINK:
        return Object.assign(Object.create(null), { id: item.sys.id });

      default:
        return item;
    }
  }
}
