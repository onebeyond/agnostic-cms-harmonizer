//-- Agnostic CMS Harmonizer - Output Types
//-- version: 1.0.0
//-- author: One Beyond
//-- license: MIT

/**
 * @summary
 * The harmonized output type that wraps the data returned from the provider client.
 *
 * @example
 * #### Unified output
 *
 * ```ts
 * type MyEntry = {
 *   title: string;
 *   description: string;
 * }
 *
 * const entry = await client.getEntry<MyEntry>({ entryId: '123' });
 * console.log(entry); // { data: { title: 'My title', description: 'My description' } }
 * ```
 */
export type HarmonizedOutput<T> = {
  data: T;
};
