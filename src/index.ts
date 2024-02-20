import {
  type HarmonizedOutput,
  type ClientParams,
  type CmsClientInstance,
} from './@types';

/**
 * AgnosticCMSHarmonizerClient class.
 */
export class AgnosticCMSHarmonizerClient {
  protected clientParams!: ClientParams;
  protected clientInstance!: CmsClientInstance;

  /**
   * Creates an instance of AgnosticCMSHarmonizerClient.
   * @param clientParams CMS client parameters.
   */
  constructor(clientParams: ClientParams) {
    this.clientParams = clientParams;
  }

  protected async agnosticCmsInitialize<T = unknown>(
    handler: () => T,
  ): Promise<T> {
    try {
      return handler();
    } catch (error) {
      throw new Error(`Failed to initialize cms client\n${error}`);
    }
  }

  protected async getEntryHarmonized<T = Record<string, unknown>>(
    getEntryHandler: () => Promise<T>,
    parserHandler: (
      data: Awaited<ReturnType<typeof getEntryHandler>>,
    ) => HarmonizedOutput<T>,
  ): Promise<HarmonizedOutput<T>> {
    try {
      const data = await getEntryHandler();
      return parserHandler(data);
    } catch (error) {
      throw new Error(`Error obtaining entry:\n${error}`);
    }
  }

  protected execParser<T = unknown>(
    handler: (data: T) => Promise<T>,
    data: T,
  ): Promise<T> {
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
