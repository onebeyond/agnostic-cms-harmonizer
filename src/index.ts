import { type HarmonizedOutput, type ClientParams, type ClientInstance } from './@types';
import { AbstractClient } from './index.abstract';

const ERROR_MSG = {
  INIT: 'Failed to initialize CMS client!',
  ENTRY: 'Error obtaining entry!',
  COLLECTION: 'Error obtaining collection!',
  NO_CLIENT: 'No client instance found!',
  HAS_CLIENT: 'Client instance already exists!',
};

/**
 * The base client class that all provider clients should extend.
 *
 * @remarks
 * This class provides a base implementation for the client instance initialization,
 * and the harmonization of the entry and collection data.
 *
 * It also provides a single point of access to the client instance.
 * It should be extended by the provider clients to implement the provider-specific
 * methods for making requests to the provider.
 *
 * The provider clients should implement the provider-specific methods for
 * making requests to the provider, and use the initialize, getClientInstance,
 * harmonizeEntry, and harmonizeCollection methods to initialize the client instance,
 * access the client instance, and harmonize the entry and collection data.
 *
 * @example
 * Client:
 * ```ts
 * import { createClient } from 'native-client';
 *
 * class MyProviderClient extends HarmonizerClient implements AbstractProvider {
 *   constructor(clientParams: ClientParams) {
 *     super(clientParams);
 *     this.clientInstance = Object.create(null);
 *   }
 *
 *   async init() {
 *     await this.initialize(async () => createClient(this.clientParams));
 *   }
 * }
 * ```
 *
 * Consume:
 * ```ts
 * import { MyProviderClient } from '@onebeyond/agnostic-cms-harmonizer';
 *
 * const client = new MyProviderClient({
 *   // ...clientParams
 * });
 *
 * await client.init();
 *
 * const entry = await client.getEntry<MyEntry>({ entryId: '123' });
 */
export class HarmonizedClient extends AbstractClient {
  /**
   * The client parameters to be used for initializing the client instance.
   *
   * @remarks
   * This property should be used to store the client parameters that are
   * required for initializing the client instance.
   *
   * It should be initialized with the client parameters that are passed to the
   * client constructor, and accessed through the initialize method.
   */
  protected clientParams!: ClientParams;

  /**
   * The client instance to be used for making requests to the provider.
   *
   * @remarks
   * This property serves as the sole access point to the client instance,
   * offering its methods for making requests to the provider. It must be
   * initialized with the initialize method prior to any other client method
   * usage, and accessed through the getClientInstance method.
   */
  protected clientInstance!: ClientInstance;

  protected constructor(clientParams: ClientParams) {
    super();
    this.clientParams = clientParams;
  }

  /**
   * Initializes the client instance.
   *
   * @remarks
   * This method should be called before any other client method.
   * It is used to initialize the client instance with the client parameters
   * that are required for making requests to the provider.
   *
   * It should be called with a handler function that is used to initialize the
   * client instance, and returns the client instance.
   *
   * @param handler - The handler function to be called to initialize the client instance.
   * @returns The client instance.
   */
  protected async initialize<T>(handler?: () => Promise<T>) {
    try {
      if (this.clientInstance) {
        throw new Error(ERROR_MSG.HAS_CLIENT);
      }
      this.clientInstance = (await handler?.()) || Object.create(null);
    } catch (error) {
      throw new Error(`${ERROR_MSG.INIT}\n${error}`);
    }
  }

  /**
   * This method is used to get the client instance.
   *
   * @remarks
   * This method should be used to provide a single point of access to the client instance.
   * It exposes the client instance methods that could be used to make requests to the provider.
   *
   * @returns The client instance.
   * @throws Error if no client instance is found.
   *
   * @example
   * ```ts
   * class MyProviderClient {
   *   public async getEntry<T>(entryId: string): Promise<HarmonizedOutput<T>> {
   *     return this.harmonizeEntry(
   *       async () => this.getClientInstance().getEntry(entryId),
   *       this.parseEntry.bind(this),
   *   }
   * }
   * ```
   */
  protected getClientInstance(): ClientInstance {
    if (!this.clientInstance) {
      throw new Error(ERROR_MSG.NO_CLIENT);
    }
    return this.clientInstance;
  }

  /**
   * Harmonizes the entry data to produce a standardized output.
   *
   * @remarks
   * This method used to get a single entry from the provider.
   *
   * It should be called with a handler function that is used to obtain the entry data,
   * and a parse function that is used to harmonize the entry data.
   *
   * It returns the harmonized entry data.
   *
   * @param handler - The handler function to be called to obtain the entry data.
   * @param parse - The parse function to be called to harmonize the entry data.
   * @returns The harmonized entry data.
   * @throws Error if no client instance is found.
   *
   * @example
   * ```ts
   * class MyProviderClient {
   *   public async getEntry<T>(entryId: string): Promise<HarmonizedOutput<T>> {
   *     return this.harmonizeEntry(
   *       async () => this.getClientInstance().getEntry(entryId),
   *       this.parseEntry.bind(this),
   *     );
   *   }
   * }
   * ```
   */
  protected async harmonizeEntry<T = Record<string, unknown>>(
    handler: () => Promise<unknown>,
    parse: (data: T) => HarmonizedOutput<T>,
  ): Promise<HarmonizedOutput<T>> {
    try {
      if (!this.clientInstance) {
        throw new Error(ERROR_MSG.NO_CLIENT);
      }
      const data = await handler();
      return parse(data as T);
    } catch (error) {
      throw new Error(`${ERROR_MSG.ENTRY}\n${error}`);
    }
  }

  /**
   * Harmonizes the collection data to produce a standardized output.
   *
   * @remarks
   * This method used to get multiple entries from the provider.
   *
   * It should be called with a handler function that is used to obtain the collection data,
   * and a parse function that is used to harmonize the collection data.
   *
   * It returns the harmonized collection data.
   *
   * @param handler - The handler function to be called to obtain the collection data.
   * @param parse - The parse function to be called to harmonize the collection data.
   * @returns The harmonized collection data.
   * @throws Error if no client instance is found.
   */
  protected async harmonizeCollection<T = Record<string, unknown>>(
    handler: () => Promise<unknown[]>,
    parse: (data: T[]) => HarmonizedOutput<T[]>,
  ): Promise<HarmonizedOutput<T[]>> {
    try {
      if (!this.clientInstance) {
        throw new Error(ERROR_MSG.NO_CLIENT);
      }
      const data = await handler();
      return parse(data as T[]);
    } catch (error) {
      throw new Error(`${ERROR_MSG.COLLECTION}\n${error}`);
    }
  }
}
