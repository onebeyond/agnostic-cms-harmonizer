import { config as configDotenv } from 'dotenv';
configDotenv();

import { HarmonizerContentfulClient } from '../../../src/cms/contentful';

type TestEntryType = {
  booleanInputFieldDefaultTrue: boolean;
  jsonInputField: {
    objectKey: string;
  };
  questions: [
    {
      configuration: {
        identifier: string;
        required: true;
      };
      identifier: string;
      label: string;
      placeholder: string;
    },
  ];
  simpleShortInputTextAreaOne: string;
  singleMediaInputField: string;
};

describe('contentful', () => {
  let contentful: HarmonizerContentfulClient;

  beforeAll(async () => {
    contentful = new HarmonizerContentfulClient({
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
      environment: process.env.CONTENTFUL_ENVIRONMENT as string,
      space: process.env.CONTENTFUL_SPACE as string,
    });
    await contentful.initialize();
  });

  describe('should not fail', () => {
    it('retrieve content in default locale (en-US)', async () => {
      const harmonizedData = await contentful.getEntry<TestEntryType>({
        entryId: process.env.CONTENTFUL_ENTRY + '',
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
      const harmonizedData = await contentful.getEntry<TestEntryType>({
        entryId: process.env.CONTENTFUL_ENTRY as string,
        nestedLevels: 0,
      });
      expect(harmonizedData).toMatchSnapshot();
    });

    it('retrieve content in specific locale `es`', async () => {
      const harmonizedData = await contentful.getEntry<TestEntryType>({
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
