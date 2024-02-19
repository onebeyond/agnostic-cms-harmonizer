/* eslint-disable @typescript-eslint/no-explicit-any */
import { type HarmonizedOutput } from './@types';
import { type CmsClientInstance } from './@types/client';

import { AgnosticCMSHarmonizerClient } from '.';

export interface AbstractGetEntryParams {
  entryId: string;
}

export abstract class AbstractAgnosticCMSHarmonizerClient extends AgnosticCMSHarmonizerClient {
  public abstract initialize(): Promise<void>;
  protected abstract getClientInstance(): CmsClientInstance;
  public abstract getEntry({
    entryId,
  }: AbstractGetEntryParams): Promise<HarmonizedOutput>;
}
