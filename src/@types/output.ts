/**
 * The objective of every provider is to match this interface after parsing the data from the entries with the custom formatters.
 */
export type HarmonizedOutput<T> = {
  data: T;
};
