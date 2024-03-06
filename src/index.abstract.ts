import { type HarmonizedOutput, type CmsClientInstance } from './@types';

import { AgnosticCMSHarmonizerClient } from './index';

export type AbstractGetEntryParams = {
  /**
   * The ID from the chosen provider entry containing the desired content
   */
  entryId: string;
};

export type AbstractGetEntriesParams = {
  /**
   * The content type from the chosen provider containing the desired content
   */
  collectionId: string;
};

/**
 * The CMS provider class is responsible for implementing these methods, which are only defined abstractly
 */
export abstract class AbstractAgnosticCMSHarmonizerClient extends AgnosticCMSHarmonizerClient {
  /**
   * Typically this is going to define a singleton client instance
   */
  public abstract initialize(): Promise<void>;

  /**
   * Returns the provider native client instance
   */
  protected abstract getClientInstance(): CmsClientInstance;

  /**
   * Each provider uses a specific terminology for categorizing content.
   * The "entry" terminology has been used there as an abstraction.
   */
  public abstract getEntry<T = unknown>({
    entryId,
  }: AbstractGetEntryParams): Promise<HarmonizedOutput<T>>;

  public abstract getEntries<T = unknown>({
    collectionId,
  }: AbstractGetEntriesParams): Promise<HarmonizedOutput<T[]>>;
}
