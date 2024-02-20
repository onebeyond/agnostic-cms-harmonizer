/* eslint-disable @typescript-eslint/no-explicit-any */
import { type HarmonizedOutput } from './@types';
import { type CmsClientInstance } from './@types/client';

import { HarmonizerClient } from './index';

export interface AbstractGetEntryParams {
  entryId: string;
}

export abstract class AbstractAgnosticCMSHarmonizerClient extends AgnosticCMSHarmonizerClient {
  public abstract initialize(): Promise<void>;
  protected abstract getClientInstance(): CmsClientInstance;
  public abstract getEntry<T = unknown>({
    entryId,
  }: AbstractGetEntryParams): Promise<HarmonizedOutput>;
}

