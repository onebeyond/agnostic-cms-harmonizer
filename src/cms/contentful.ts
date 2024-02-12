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

  public async initialize(): Promise<void> {
    this.clientInstance = await this.agnosticCmsInitialize(async () =>
      createClient(this.clientParams),
    );
  }

  protected getClientInstance(): ContentfulClientApi<undefined> {
    return this.clientInstance as ContentfulClientApi<undefined>;
  }

  public async getSpace(): Promise<any> {
    await this.getClientInstance();
  }
}
