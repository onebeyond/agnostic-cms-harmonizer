/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * The objective of every provider is to match this interface after parsing
 * the data from the entries with the custom formatters.
 */
export interface HarmonizedOutput {
  data: Record<string, any>[];
}
