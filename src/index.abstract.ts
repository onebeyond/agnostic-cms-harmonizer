import { CmsClientInstance, HarmonizedResponse } from './@types/client';

import HarmonizerClient from './index';

abstract class AbstractHarmonizerClient extends HarmonizerClient {
  public abstract initialize(): Promise<void>;
  protected abstract getClientInstance(): CmsClientInstance;
  public abstract getEntry<T = unknown>(
    entryId: string,
  ): Promise<HarmonizedResponse<T>>;
  public abstract getEntry<T = unknown>(
    entryId: string,
    modifiers?: unknown,
  ): Promise<HarmonizedResponse<T>>;
}

export default AbstractHarmonizerClient;
