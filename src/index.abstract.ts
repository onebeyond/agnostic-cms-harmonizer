/* eslint-disable @typescript-eslint/no-explicit-any */
import { CmsClientInstance } from './@types/client';

import { AgnosticCMSHarmonizerClient } from '.';

export abstract class AbstractAgnosticCMSHarmonizerClient extends AgnosticCMSHarmonizerClient {
  abstract initialize(): Promise<void>;
  abstract getSpace(): Promise<any>;
  abstract getClientInstance(): CmsClientInstance;
}
