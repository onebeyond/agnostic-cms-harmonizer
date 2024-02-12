/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { ClientParams, CmsClientInstance } from './@types/client';

export class AgnosticCMSHarmonizerClient {
  protected clientParams!: ClientParams;
  protected clientInstance!: CmsClientInstance;

  constructor(clientParams: ClientParams) {
    this.clientParams = clientParams;
  }

  // Agnostics

  protected async agnosticCmsInitialize(handler: Function): Promise<any> {
    try {
      return await handler();
    } catch (error) {
      throw new Error(`Failed to initialize cms client\n${error}`);
    }
  }

  // async agnosticGetEntries(clientMethod, params): Promise<any> {
  //   try {
  //   } catch (error) {
  //     throw new Error(`Error obtaining cms entries: ${JSON.stringify(params)}`);
  //   }
  // }

  // Non agnostics (CMS particulars)
  protected async initialize(): Promise<void> {}
}
