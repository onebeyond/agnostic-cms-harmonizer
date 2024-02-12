import {
  CreateClientParams as ContentfulClientParams,
  ContentfulClientApi,
} from 'contentful';

export type ClientParams = ContentfulClientParams;
export enum CmsClientName {
  contentful = 'contentful',
}
export type CmsClientInstance = ContentfulClientApi<undefined>;
