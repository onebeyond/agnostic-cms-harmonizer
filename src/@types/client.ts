import {
  type BaseEntry as ContentfulBaseEntry,
  type CreateClientParams as ContentfulClientParams,
  type Entry as TContentfulEntry,
  type EntryQueries as TContentfulEntryQueries,
  type EntriesQueries as TContentfulEntriesQueries,
  type EntrySkeletonType as TContentfulEntrySkeletonType,
  type ContentfulClientApi as TContentfulClientApi,
  type FieldsType as TContentfulFieldsType,
  type ChainModifiers as TContentfulChainModifiers,
} from 'contentful';

type AbstractGetEntryParams = {
  entryId: string;
};

type AbstractGetCollectionParams = {
  collectionId: string;
};

type ClientParams = ContentfulClientParams;

type ClientInstance<T extends ContentfulChainModifiers = undefined> = TContentfulClientApi<T>;

type ContentfulEntry<T> = TContentfulEntry<
  ContentfulEntrySkeletonType<T & ContentfulFieldsType>,
  undefined,
  string
>;

type ContentfulChainModifiers = TContentfulChainModifiers;

type ContentfulEntrySkeleton<T> = ContentfulEntrySkeletonType<T>;

type ContentfulEntrySkeletonType<T> = TContentfulEntrySkeletonType<T & TContentfulFieldsType>;

type ContentfulEntryQueries<T> = TContentfulEntryQueries<
  ContentfulEntrySkeleton<T> & ContentfulChainModifiers
>;

type ContentfulEntriesQueries<T> = TContentfulEntriesQueries<
  ContentfulEntrySkeleton<T>,
  TContentfulChainModifiers
>;

type ContentfulFieldsType = TContentfulFieldsType;

type ContentfulClientApi<T> = TContentfulClientApi<T & ContentfulChainModifiers>;

type ContentfulNestedLevels = 0 | 2 | 1 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

type ContentfulGetEntryParams = AbstractGetEntryParams &
  ContentfulEntryQueries<ContentfulChainModifiers> & {
    locale?: string;
    nestedLevels?: ContentfulNestedLevels;
  };

type ContentfulGetEntriesParams<T> = AbstractGetCollectionParams &
  ContentfulEntriesQueries<ContentfulEntrySkeleton<T>> & {
    locale?: string;
    nestedLevels?: ContentfulNestedLevels;
  };

export {
  AbstractGetEntryParams,
  AbstractGetCollectionParams,
  ContentfulBaseEntry,
  ContentfulClientParams,
  ContentfulChainModifiers,
  ContentfulClientApi,
  ContentfulEntry,
  ContentfulEntryQueries,
  ContentfulEntriesQueries,
  ContentfulEntrySkeleton,
  ContentfulEntrySkeletonType,
  ContentfulGetEntriesParams,
  ContentfulGetEntryParams,
  ContentfulNestedLevels,
  ClientParams,
  ClientInstance,
};
