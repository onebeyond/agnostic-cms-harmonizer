import {
  type HarmonizedOutput,
  type ClientInstance,
  type ClientParams,
  type AbstractGetEntryParams,
  type AbstractGetCollectionParams,
} from './@types';

export abstract class AbstractClient {
  protected abstract clientParams: ClientParams;

  protected abstract clientInstance: ClientInstance;

  protected abstract initialize<T = unknown>(handler?: () => Promise<T>): Promise<void>;

  protected abstract getClientInstance(): ClientInstance;
}

export abstract class AbstractProvider {
  public abstract init(): Promise<void>;

  public abstract getEntry<T = unknown>({
    entryId,
  }: AbstractGetEntryParams): Promise<HarmonizedOutput<T>>;

  public abstract getCollection<T = unknown>({
    collectionId,
  }: AbstractGetCollectionParams): Promise<HarmonizedOutput<T[]>>;
}
