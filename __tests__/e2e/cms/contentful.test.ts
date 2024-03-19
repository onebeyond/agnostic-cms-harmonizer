import { config as configDotenv } from 'dotenv';
configDotenv();

import { ContentfulClient } from '../../../src/cms/contentful';

console.log('CONTENTFUL_SPACE', process.env.CONTENTFUL_SPACE);
console.log('CONTENTFUL_ENVIRONMENT', process.env.CONTENTFUL_ENVIRONMENT);
console.log('CONTENTFUL_ENTRY', process.env.CONTENTFUL_ENTRY);
console.log('CONTENTFUL_CONTENT_TYPE', process.env.CONTENTFUL_CONTENT_TYPE);

type TestEntryType = {
  booleanInputFieldDefaultTrue: boolean;
  jsonInputField: {
    objectKey: string;
  };
  questions: [
    {
      configuration: {
        id?: string;
        identifier?: string;
        required?: boolean;
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
  let contentful: ContentfulClient;

  beforeAll(async () => {
    contentful = new ContentfulClient({
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
      environment: process.env.CONTENTFUL_ENVIRONMENT as string,
      space: process.env.CONTENTFUL_SPACE as string,
    });
    await contentful.init();
  });

  describe('should not fail', () => {
    it('retrieve content in default locale (en-US)', async () => {
      const harmonizedData = await contentful.getEntry<TestEntryType>({
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
    it('retrieve array of available entries in default locale (en-US)', async () => {
      const harmonizedData = await contentful.getCollection<TestEntryType>({
        collectionId: process.env.CONTENTFUL_CONTENT_TYPE as string,
      });
      expect(Array.isArray(harmonizedData.data)).toBeTruthy();
      expect(harmonizedData).toMatchSnapshot({
        data: [
          {
            singleMediaInputField: expect.stringMatching(
              /^https:\/\/images\.ctfassets\.net\/.+\/banner\.jpg$/,
            ),
          },
        ],
      });
    });

    it('retrieve array of available entries in given locale (es)', async () => {
      const harmonizedData = await contentful.getCollection<TestEntryType>({
        collectionId: process.env.CONTENTFUL_CONTENT_TYPE as string,
        locale: 'es',
      });
      expect(Array.isArray(harmonizedData.data)).toBeTruthy();
      expect(harmonizedData).toMatchSnapshot({
        data: [
          {
            singleMediaInputField: expect.stringMatching(
              /^https:\/\/images\.ctfassets\.net\/.+\/banner\.jpg$/,
            ),
          },
        ],
      });
    });
  });
});
