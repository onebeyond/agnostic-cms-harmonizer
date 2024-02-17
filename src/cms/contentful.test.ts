const MOCK_ACCESS_TOKEN = 'mock_token';
const MOCK_SPACE = 'mock_space';

const contentfulPkg = jest.requireActual('contentful');
const contentfulMockPkg = jest.requireMock('contentful');

jest.mock('contentful', () => ({
  ...contentfulPkg,
  createClient: jest.fn((params) => contentfulPkg.createClient(params)),
}));

import { Contentful } from './contentful';

describe('Contentful', () => {
  describe('Client', () => {
    it('should instantiate client instance from the Harmonizer', async () => {
      expect.assertions(3);

      const contentful = new Contentful({
        accessToken: MOCK_ACCESS_TOKEN,
        space: MOCK_SPACE,
      });

      const initializeSpy = jest.spyOn(Contentful.prototype, 'initialize');
      const createClientSpy = jest.spyOn(contentfulMockPkg, 'createClient');

      expect(initializeSpy.mock.calls.length).toEqual(0);

      await contentful.initialize();

      expect(initializeSpy.mock.calls.length).toEqual(1);
      expect(createClientSpy.mock.lastCall?.[0]).toMatchObject({
        accessToken: MOCK_ACCESS_TOKEN,
        space: MOCK_SPACE,
      });
    });
  });
});
