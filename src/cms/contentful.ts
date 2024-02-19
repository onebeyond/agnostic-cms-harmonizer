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
import { AbstractAgnosticCMSHarmonizerClient } from '../index.abstract';

enum ContentfulResourceType {
  ENTRY = 'Entry',
  ASSET = 'Asset',
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

  public async getEntry(
    entryId: string,
    locale?: string,
  ): Promise<HarmonizedOutput> {
    const query = {
      locale,
      include: 10 as const, // Include up to 10 levels of linked entries
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
        return `https:${item.fields?.file?.url}`;

      default:
        return item;
    }
  }
}
