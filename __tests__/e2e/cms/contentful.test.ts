import { config as configDotenv } from 'dotenv';
configDotenv();

import { Contentful } from '../../../src/cms/contentful';

describe('contentful', () => {
  let contentful: Contentful;

  beforeAll(async () => {
    contentful = new Contentful({
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
      environment: process.env.CONTENTFUL_ENVIRONMENT as string,
      space: process.env.CONTENTFUL_SPACE as string,
    });
    await contentful.initialize();
  });

  describe('should not fail', () => {
    it('retrieve content in default locale (en-US)', async () => {
      const harmonizedData = await contentful.getEntry({
        entryId: process.env.CONTENTFUL_ENTRY as string,
      });
      expect(harmonizedData).toMatchSnapshot({
        data: {
          singleMediaInputField: expect.stringMatching(
            /^https:\/\/images\.ctfassets\.net\/.+\/banner\.jpg$/,
          ),
        },
      });
    });

    it('retrieve only root level of content in default locale (en-US)', async () => {
      const harmonizedData = await contentful.getEntry({
        entryId: process.env.CONTENTFUL_ENTRY as string,
        nestedLevels: 0,
      });
      expect(harmonizedData).toMatchSnapshot();
    });

    it('retrieve content in specific locale `es`', async () => {
      const harmonizedData = await contentful.getEntry({
        entryId: process.env.CONTENTFUL_ENTRY as string,
        locale: 'es',
      });
      expect(harmonizedData).toMatchSnapshot({
        data: {
          singleMediaInputField: expect.stringMatching(
            /^https:\/\/images\.ctfassets\.net\/.+\/banner\.jpg$/,
          ),
        },
      });
    });
  });
});
