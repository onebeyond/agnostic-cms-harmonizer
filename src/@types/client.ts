import {
  CreateClientParams as ContentfulClientParams,
  ContentfulClientApi,
  ChainModifiers,
} from 'contentful';

/**
 * The types that the native clients of the different providers support in the arguments to be initialized
 * should be reflected in this type that encompasses them all
 */
export type ClientParams = ContentfulClientParams;

/**
 * This generic type allows us to instantiate the type that the client of the chosen provider returns to us
 * @typeParam T - https://contentful.github.io/contentful.js/contentful/10.6.21/types/ChainModifiers.html
 */
export type CmsClientInstance<T extends ChainModifiers = undefined> = ContentfulClientApi<T>;
