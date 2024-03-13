// Copyright (c) One Beyond. All rights reserved. Licensed under the MIT license.

/**
 * The harmonized output type that wraps the data returned from the provider client.
 *
 * @remarks
 * This type is used to wrap the data returned from the provider client in a unified
 * format, so that the consumer can expect the same output format from all provider
 * clients extending the {@link index.HarmonizedClient | HarmonizedClient}.
 *
 * @example
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
