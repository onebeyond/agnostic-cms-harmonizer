import { type HarmonizedOutput, type ClientParams, type ClientInstance } from './@types';
import { AbstractClient } from './index.abstract';

const ERROR_MSG = {
  INIT: 'Failed to initialize CMS client!',
  ENTRY: 'Error obtaining entry!',
  COLLECTION: 'Error obtaining collection!',
};

/**
 * @summary
 * The base client class that all provider clients should extend.
 *
 * @example
 *
 * Client:
 * ```ts
 * import { createClient } from 'native-client';
 *
 * class MyProviderClient extends HarmonizerClient {
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
 * import { MyProviderClient } from 'my-provider-client';
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
  constructor(clientParams: ClientParams) {
    super();
    this.clientParams = clientParams;
  }

  protected async initialize<T>(handler?: () => Promise<T>) {
    try {
      this.clientInstance = (await handler?.()) || Object.create(null);
    } catch (error) {
      throw new Error(`${ERROR_MSG.INIT}\n${error}`);
    }
  }

  protected clientParams!: ClientParams;

  protected clientInstance!: ClientInstance;

  protected getClientInstance(): ClientInstance {
    return this.clientInstance;
  }

  protected async harmonizeEntry<T = Record<string, unknown>>(
    handler: () => Promise<unknown>,
    parse: (data: T) => HarmonizedOutput<T>,
  ): Promise<HarmonizedOutput<T>> {
    try {
      const data = await handler();
      return parse(data as T);
    } catch (error) {
      throw new Error(`${ERROR_MSG.ENTRY}\n${error}`);
    }
  }

  protected async harmonizeCollection<T = Record<string, unknown>>(
    handler: () => Promise<unknown[]>,
    parse: (data: T[]) => HarmonizedOutput<T[]>,
  ): Promise<HarmonizedOutput<T[]>> {
    try {
      const data = await handler();
      return parse(data as T[]);
    } catch (error) {
      throw new Error(`${ERROR_MSG.COLLECTION}\n${error}`);
    }
  }
}
