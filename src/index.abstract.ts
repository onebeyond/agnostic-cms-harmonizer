/* eslint-disable @typescript-eslint/no-explicit-any */
import { type HarmonizedOutput, type CmsClientInstance } from './@types';

import { AgnosticCMSHarmonizerClient } from './index';

export type AbstractGetEntryParams = {
  entryId: string;
};

export abstract class AbstractAgnosticCMSHarmonizerClient extends AgnosticCMSHarmonizerClient {
  public abstract initialize(): Promise<void>;
  protected abstract getClientInstance(): CmsClientInstance;
  public abstract getEntry<T = unknown>({
    entryId,
  }: AbstractGetEntryParams): Promise<HarmonizedOutput<T>>;
}
