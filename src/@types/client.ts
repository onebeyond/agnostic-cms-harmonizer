import {
  CreateClientParams as ContentfulClientParams,
  ContentfulClientApi,
  ChainModifiers,
} from 'contentful';

/**
 * Custom type that implements multiple CMS providers client initialize
 */
export type ClientParams = ContentfulClientParams;
export type CmsClientInstance<T extends ChainModifiers = undefined> = ContentfulClientApi<T>;
