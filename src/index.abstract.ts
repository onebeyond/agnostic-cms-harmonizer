import { CmsClientInstance, HarmonizerResponse } from './@types/client';

import { HarmonizerClient } from './index';

export abstract class AbstractHarmonizerClient extends HarmonizerClient {
  public abstract initialize(): Promise<void>;
  protected abstract getClientInstance(): CmsClientInstance;
  public abstract getEntry<T = unknown>(
    entryId: string,
  ): Promise<HarmonizerResponse<T>>;
  public abstract getEntry<T = unknown>(
    entryId: string,
    modifiers?: unknown,
  ): Promise<HarmonizerResponse<T>>;
}
