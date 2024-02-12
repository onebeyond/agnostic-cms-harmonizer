import {
  CreateClientParams as ContentfulClientParams,
  createClient,
} from 'contentful';

import { AgnosticCMSHarmonizerClient } from '..';
import { CmsClientName } from '../@types/client';

export class Contentful extends AgnosticCMSHarmonizerClient {
  constructor(clientParams: ContentfulClientParams) {
    super(CmsClientName.contentful, createClient, clientParams);
  }
}
