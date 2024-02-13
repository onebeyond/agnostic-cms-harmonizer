import { Contentful } from '../../../src/cms/contentful';

describe('contentful', () => {
  describe('should not fail', () => {
    it('retrieve content', async () => {
      const contentful = new Contentful({
        accessToken: 'x',
        space: 'y',
      });
    });
  });
});
