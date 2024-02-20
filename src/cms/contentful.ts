/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  type CreateClientParams as ContentfulClientParams,
  createClient,
  type ContentfulClientApi,
  type Entry,
  type EntrySkeletonType,
  EntryQueries,
} from 'contentful';

import { HarmonizedOutput } from '../@types';
import {
  AbstractAgnosticCMSHarmonizerClient,
  AbstractGetEntryParams,
} from '../index.abstract';

const ContentfulResourceType = Object.freeze({
  ASSET: 'Asset',
  ENTRY: 'Entry',
  LINK: 'Link',
} as const);

export interface ContentfulGetEntryParams extends AbstractGetEntryParams {
  locale?: string;
  nestedLevels?: 0 | 2 | 1 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
}

export class Contentful extends AbstractAgnosticCMSHarmonizerClient {
  constructor(clientParams: ContentfulClientParams) {
    super(clientParams);
  }

  public async initialize(): Promise<void> {
    this.clientInstance = await this.agnosticCmsInitialize(async () =>
      createClient(this.clientParams),
    );
  }

  protected getClientInstance(): ContentfulClientApi<undefined> {
    return this.clientInstance as ContentfulClientApi<undefined>;
  }

  public async getEntry({
    entryId,
    locale,
    nestedLevels = 10,
  }: ContentfulGetEntryParams): Promise<HarmonizedOutput> {
    const query = {
      locale,
      include: nestedLevels, // Include up to 10 levels of linked entries
    };

    return await this.getEntryHarmonized(
      this.getEntryHandler.bind(this, entryId, query),
      this.parserHandler.bind(this),
    );
  }

  private async getEntryHandler(
    entryId: string,
    query?: EntryQueries<undefined>,
  ): Promise<Entry<EntrySkeletonType, undefined, string>> {
    return this.getClientInstance().getEntry(entryId, query);
  }

  private parserHandler(
    payload: Entry<EntrySkeletonType, undefined, string>,
  ): HarmonizedOutput {
    const output = this.mapper(payload);
    return { data: output };
  }

  private mapper(item: any): any {
    switch (item?.sys?.type) {
      case ContentfulResourceType.ENTRY:
        return Object.entries(item.fields).reduce((acc, [key, value]) => {
          if (Array.isArray(value)) {
            return {
              ...acc,
              [key]: value.map((valueItem) => this.mapper(valueItem)),
            };
          }
          return { ...acc, [key]: this.mapper(value) };
        }, {});

      case ContentfulResourceType.ASSET:
        return item.fields?.file?.url ?
            `https:${item.fields?.file?.url}`
          : undefined;

      case ContentfulResourceType.LINK:
        return { id: item.sys.id };

      default:
        return item;
    }
  }
}
