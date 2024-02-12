/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import {
  ClientParams,
  CmsClientInstance,
  CmsClientName,
} from './@types/client';

export class AgnosticCMSHarmonizerClient {
  private cmsClientName!: CmsClientName;
  private clientParams!: ClientParams;
  private clientInstance!: CmsClientInstance;
  private createClientFunction!: Function;
  private getCmsSpace!: Function;

  constructor(
    cmsClientName: CmsClientName,
    createClientFunction: Function,
    clientParams: ClientParams,
  ) {
    this.cmsClientName = cmsClientName;
    this.clientParams = clientParams;
    this.createClientFunction = createClientFunction;
  }

  async initialize(): Promise<void> {
    this.clientInstance = await this.createClientFunction(this.clientParams);
    if (this.cmsClientName === CmsClientName.contentful) {
      this.getCmsSpace = this.clientInstance.getEntries;
    }
  }

  async getSpace(name: string): Promise<any> {
    return this.getCmsSpace(name);
  }
}
