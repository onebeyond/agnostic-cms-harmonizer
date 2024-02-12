import {
  ContentfulClientApi,
  CreateClientParams as ContentfulClientParams,
  createClient,
} from 'contentful';

import { AgnosticCMSHarmonizerClient } from '..';

export class Contentful extends AgnosticCMSHarmonizerClient {
  private client!: ContentfulClientApi<undefined>;

  constructor(clientParams: ContentfulClientParams) {
    super(clientParams);
  }

  async initialize(): Promise<void> {
    this.client = await this.agnosticCmsInitialize(async () =>
      createClient(this.clientParams),
    );
  }
}
