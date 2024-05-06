// @ts-ignore
import { ContentfulClient } from '@onebeyond/agnostic-cms-harmonizer';

it('should check the imported library is an instance of ContentfulClient', () => {
  const instance = new ContentfulClient({
    accessToken: '',
    space: '',
    environment: '',
  });
  expect(instance).toBeInstanceOf(ContentfulClient);
});
describe('import-library', () => {});
