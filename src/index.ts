import {
  ClientParams,
  CmsClientInstance,
  HarmonizedResponse,
} from './@types/client';

/**
 * HarmonizerClient
 */
export class HarmonizerClient {
  protected clientParams!: ClientParams;
  protected clientInstance!: CmsClientInstance;

  /**
   * Creates an instance of HarmonizerClient from the provided parameters.
   * @param {ClientParams} clientParams - The CMS client parameters.
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

  /**
   * Returns the harmonized response from an entry request.
   * @param handler The handler function to obtain the entry.
   * @param parser The parser function to harmonize the response.
   * @returns The harmonized response.
   */
  protected async getEntryHarmonized<
    T = Record<string, unknown>,
    R = Record<string, unknown>,
  >(
    handler: () => Promise<T>,
    parser: (
      data: Awaited<ReturnType<typeof handler>>,
    ) => HarmonizedResponse<R>,
  ): Promise<HarmonizedResponse<R>> {
    try {
      const data = await handler();
      return parser(data);
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
