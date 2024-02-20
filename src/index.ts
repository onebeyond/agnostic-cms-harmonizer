/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { ClientParams, CmsClientInstance } from './@types/client';

/**
 * It is not gonna be used by the client directly.
 *
 * CMS providers are going to extend their dedicated class from this
 */
export class AgnosticCMSHarmonizerClient {
  protected clientParams!: ClientParams;
  protected clientInstance!: CmsClientInstance;

  /**
   * Creates an instance of AgnosticCMSHarmonizerClient.
   * @param clientParams custom type that implements multiple CMS providers client initialize type definitions without any restrictions
   */
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

  protected async getEntryHarmonized(
    getEntryHandler: Function,
    parserHandler: Function,
  ): Promise<any> {
    try {
      const data = await getEntryHandler();
      return parserHandler(data);
    } catch (error) {
      throw new Error(`Error obtaining entry:\n${error}`);
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
