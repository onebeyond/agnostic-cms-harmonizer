import {
  CreateClientParams as ContentfulClientParams,
  ContentfulClientApi,
} from 'contentful';

export type ClientParams = ContentfulClientParams;
export type CmsClientInstance = ContentfulClientApi<undefined>;
