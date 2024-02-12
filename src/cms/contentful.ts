/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CreateClientParams as ContentfulClientParams,
  createClient,
  ContentfulClientApi,
} from 'contentful';

import { AbstractAgnosticCMSHarmonizerClient } from '../index.abstract';

export class Contentful extends AbstractAgnosticCMSHarmonizerClient {
  constructor(clientParams: ContentfulClientParams) {
    super(clientParams);
  }

  async initialize(): Promise<void> {
    this.clientInstance = await this.agnosticCmsInitialize(async () =>
      createClient(this.clientParams),
    );
  }

  getClientInstance(): ContentfulClientApi<undefined> {
    return this.clientInstance as ContentfulClientApi<undefined>;
  }

  async getSpace(): Promise<any> {
    await this.getClientInstance();
  }
}
