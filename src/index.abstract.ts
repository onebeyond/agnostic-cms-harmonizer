/* eslint-disable @typescript-eslint/no-explicit-any */
import { type HarmonizedOutput } from './@types';
import { type CmsClientInstance } from './@types/client';

import { AgnosticCMSHarmonizerClient } from '.';

export interface AbstractGetEntryParams {
  /**
   * id from the chosen provider entry containing the desired content
   */
  entryId: string;
}

/**
 * The CMS provider class is responsible for implementing these methods, which are only defined abstractly.
 */

export abstract class AbstractAgnosticCMSHarmonizerClient extends AgnosticCMSHarmonizerClient {
  /**
   * Typically this is going to define a singleton client instance
   */
  public abstract initialize(): Promise<void>;

  /**
   * Returns to the provider class methods the instanced client
   */
  protected abstract getClientInstance(): CmsClientInstance;

  /**
   * Each provider uses a specific terminology for categorizing content
   *
   * The "entry" terminology has been used there as an abstraction
   */
  public abstract getEntry({
    entryId,
  }: AbstractGetEntryParams): Promise<HarmonizedOutput>;
}
