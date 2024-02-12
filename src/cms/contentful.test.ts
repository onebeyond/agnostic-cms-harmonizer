import { Contentful } from './contentful';

describe('contentful', () => {
  describe('should not fail', () => {
    it('instance contentful client', async () => {
      const contentful = new Contentful({
        accessToken: '',
        space: '',
      });
      await contentful.initialize();
    });
  });
});
