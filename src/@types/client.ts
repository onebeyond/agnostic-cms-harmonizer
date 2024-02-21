import {
  CreateClientParams as ContentfulClientParams,
  ContentfulClientApi,
  ChainModifiers,
} from 'contentful';

export type ClientParams = ContentfulClientParams;
export type CmsClientInstance<T extends ChainModifiers = undefined> =
  ContentfulClientApi<T>;
