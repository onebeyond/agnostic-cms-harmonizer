import { config as configDotenv } from 'dotenv';
configDotenv();


import { Contentful } from '../../../src/cms/contentful';

describe('contentful', () => {
  describe('should not fail', () => {
    it('retrieve content', async () => {
      const contentful = new Contentful({
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
        environment: process.env.CONTENTFUL_ENVIRONMENT as string,
        space: process.env.CONTENTFUL_SPACE as string,
      });
      await contentful.initialize();
      const harmonizedData = await contentful.getEntry(
        process.env.CONTENTFUL_ENTRY as string,
      );
      expect(harmonizedData).toMatchSnapshot();
    });
  });
});
