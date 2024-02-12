/* eslint-disable @typescript-eslint/no-explicit-any */
import { CmsClientInstance } from './@types/client';

import { AgnosticCMSHarmonizerClient } from '.';

export abstract class AbstractAgnosticCMSHarmonizerClient extends AgnosticCMSHarmonizerClient {
  public abstract initialize(): Promise<void>;
  protected abstract getClientInstance(): CmsClientInstance;
  public abstract getSpace(): Promise<any>;
}
