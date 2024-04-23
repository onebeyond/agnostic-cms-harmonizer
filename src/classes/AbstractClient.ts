// Copyright (c) One Beyond. All rights reserved. Licensed under the MIT license.

import {
  type HarmonizedOutput,
  type ClientInstance,
  type ClientParams,
  type AbstractGetEntryParams,
  type AbstractGetCollectionParams,
} from '../@types';

/**
 * The abstract client class that all harmonizer clients should extend.
 *
 * @remarks
 * This class offers a foundational implementation for initializing the client
 * instance and accessing it.
 *
 * It should be extended by new types of harmonizer clients to offer varied forms
 * of harmonized output.
 */
export abstract class AbstractClient {
  protected abstract clientParams: ClientParams;

  protected abstract clientInstance: ClientInstance;

  protected abstract initialize<T = unknown>(handler?: () => Promise<T>): Promise<void>;

  protected abstract getClientInstance(): ClientInstance;
}

/**
 * The abstract provider class that all provider clients should extend.
 *
 * @remarks
 * This class offers the necessary interface for the provider clients to implement
 * the provider-specific methods for making requests to the provider and harmonizing
 * the entry and collection data to produce output assigned to an {@link AbstractClient}
 * (for example: {@link HarmonizedOutput} for {@link index.HarmonizedClient | HarmonizedClient}).
 */
export abstract class AbstractProvider {
  public abstract init(): Promise<void>;

  public abstract getEntry<T = unknown>({
    entryId,
  }: AbstractGetEntryParams): Promise<HarmonizedOutput<T>>;

  public abstract getCollection<T = unknown>({
    collectionId,
  }: AbstractGetCollectionParams): Promise<HarmonizedOutput<T[]>>;
}
