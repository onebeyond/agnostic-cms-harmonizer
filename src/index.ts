/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { ClientParams, CmsClientInstance } from './@types/client';

export class AgnosticCMSHarmonizerClient {
  protected clientParams!: ClientParams;
  protected clientInstance!: CmsClientInstance;

  constructor(clientParams: ClientParams) {
    this.clientParams = clientParams;
  }

  protected async agnosticCmsInitialize(handler: Function): Promise<any> {
    try {
      return await handler();
    } catch (error) {
      throw new Error(`Failed to initialize cms client\n${error}`);
    }
  }

  protected execParser(handler: Function, data: any): Promise<any> {
    try {
      if (!data) {
        throw new Error('No data provided for parsing');
      }
      return handler(data);
    } catch (error) {
      throw new Error(`Error parsing the data:\n${error}`);
    }
  }
}
