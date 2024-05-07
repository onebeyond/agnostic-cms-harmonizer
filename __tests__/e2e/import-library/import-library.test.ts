import { ContentfulClient } from '@onebeyond/agnostic-cms-harmonizer';

describe('import-library', () => {
  it('should check the imported library is an instance of ContentfulClient', () => {
    const instance = new ContentfulClient({
      accessToken: '',
      space: '',
      environment: '',
    });
    expect(instance).toBeInstanceOf(ContentfulClient);
  });
});
