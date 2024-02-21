const MOCK_ACCESS_TOKEN = 'mock_token';
const MOCK_SPACE = 'mock_space';

const contentfulPkg = jest.requireActual('contentful');
const contentfulMockPkg = jest.requireMock('contentful');

jest.mock('contentful', () => ({
  ...contentfulPkg,
  createClient: jest.fn((params) => contentfulPkg.createClient(params)),
}));

import { HarmonizerContentfulClient } from './contentful';

describe('Contentful', () => {
  describe('Client', () => {
    it('should instantiate client instance from the Harmonizer', async () => {
      const contentful = new HarmonizerContentfulClient({
        accessToken: MOCK_ACCESS_TOKEN,
        space: MOCK_SPACE,
      });

      const initializeSpy = jest.spyOn(
        HarmonizerContentfulClient.prototype,
        'initialize',
      );

      const createClientSpy = jest.spyOn(contentfulMockPkg, 'createClient');

      const spyAgnosticCmsInitialize = jest.spyOn(
        contentful,
        'agnosticCmsInitialize' as keyof typeof contentful,
      );

      expect(initializeSpy.mock.calls.length).toEqual(0);
      expect(spyAgnosticCmsInitialize.mock.calls).toEqual([]);

      await contentful.initialize();

      expect(initializeSpy.mock.calls.length).toEqual(1);
      expect(createClientSpy.mock.lastCall?.[0]).toMatchObject({
        accessToken: MOCK_ACCESS_TOKEN,
        space: MOCK_SPACE,
      });
    });
  });
});
