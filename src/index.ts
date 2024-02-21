/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { ClientParams, CmsClientInstance } from './@types/client';
import { HarmonizedOutput } from './@types/output';

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

  /**
   * Only the implementation of the abstract method from the provider class should reference on to this.
   * @param handler a function usually executing the native provider library initialize way
   * @returns The handler generated output
   * @throws An error with a minimal description, followed by the unmodified error of the provided function
   */
  protected async agnosticCmsInitialize(handler: Function): Promise<any> {
    try {
      return await handler();
    } catch (error) {
      throw new Error(`Failed to initialize cms client\n${error}`);
    }
  }

  /**
   * {@inheritDoc index.AgnosticCMSHarmonizerClient#agnosticCmsInitialize}
   * @param getEntryHandler a function executing the native provider library method for obtaining the content
   * @param parserHandler again, an exclusive function to parse the obtained entry data, since each provider
   * returns the entries with a different format
   * @returns The entry data formatted with the generic output format. Otherwise an error would have occurred
   */
  protected async getEntryHarmonized(
    getEntryHandler: Function,
    parserHandler: Function,
  ): Promise<HarmonizedOutput> {
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
