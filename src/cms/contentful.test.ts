/* eslint-disable @typescript-eslint/no-explicit-any */
const contentfulPkg = jest.requireActual('contentful');
const contentfulMockedPkg = jest.requireMock('contentful');
jest.mock('contentful', () => ({
  ...contentfulPkg,
  createClient: jest.fn((params) => contentfulPkg.createClient(params)),
}));
import { Contentful } from './contentful';

describe('contentful', () => {
  describe('should not fail', () => {
    it('instance contentful client', async () => {
      const contentful = new Contentful({
        accessToken: '0b7f6x59a0',
        space: 'developer_bookshelf',
      });

      expect(Object.getOwnPropertyNames(Contentful.prototype)).toEqual([
        'constructor',
        'initialize',
        'getClientInstance',
        'getEntry',
      ]);

      const spyAgnosticCmsInitialize = jest.spyOn(
        contentful,
        'agnosticCmsInitialize' as any,
      );
      expect(spyAgnosticCmsInitialize.mock.calls).toEqual([]);
      await contentful.initialize();
      expect(spyAgnosticCmsInitialize.mock.calls.toString()).toEqual(
        '() => __awaiter(this, void 0, void 0, function* () { return (0, contentful_1.createClient)(this.clientParams); })',
      );

      expect(contentfulMockedPkg.createClient.mock.calls).toEqual([
        [
          {
            accessToken: '0b7f6x59a0',
            space: 'developer_bookshelf',
          },
        ],
      ]);
    });
  });
});
