// eslint-disable-next-line import/no-unresolved
import { ContentfulClient } from '@onebeyond/agnostic-cms-harmonizer';

describe('import-library', () => {
  it('should import the library', () => {
    const instance = new ContentfulClient({
      accessToken: '',
      space: '',
      environment: '',
    });
    expect(instance).toBeInstanceOf(ContentfulClient);
  });
});
