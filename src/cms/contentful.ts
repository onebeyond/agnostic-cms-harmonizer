import {
  CreateClientParams as ContentfulClientParams,
  createClient,
  ContentfulClientApi,
  EntryQueries,
  Entry,
  EntrySkeletonType,
  FieldsType,
} from 'contentful';

import { AbstractHarmonizerClient } from '../index.abstract';

type ContentfulEntry<T> = Entry<EntrySkeletonType<T & FieldsType>>;

/**
 * The Harmonized Contentful CMS client.
 */
export class Contentful extends AbstractHarmonizerClient {
  protected clientInstance: ContentfulClientApi<undefined>;

  constructor(clientParams: ContentfulClientParams) {
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
   * Returns the Contentful client instance.
   * @returns {ContentfulClientApi<undefined>}
   */
  protected getClientInstance(): ContentfulClientApi<undefined> {
    return this.clientInstance;
  }

  /**
   * Returns the harmonized response from an entry request.
   * @param entryId The Entry ID.
   * @param modifiers The Contentful query modifiers.
   * @returns The harmonized response.
   */
  public async getEntry<T = Record<string, unknown>>(
    entryId: string,
    modifiers?: EntryQueries<undefined>,
  ) {
    return await this.getEntryHarmonized<
      ContentfulEntry<T>,
      ContentfulEntry<T>['fields']
    >(
      () =>
        this.getClientInstance().getEntry<EntrySkeletonType<T & FieldsType>>(
          entryId,
          modifiers,
        ),
      ({ fields }) => ({ data: fields }),
    );
  }
}
