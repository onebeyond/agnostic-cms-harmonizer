'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : (
          new P(function (resolve) {
            resolve(value);
          })
        );
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ?
          resolve(result.value)
        : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, '__esModule', { value: true });
const dotenv_1 = require('dotenv');
(0, dotenv_1.config)();
const contentful_1 = require('../../../src/cms/contentful');
describe('contentful', () => {
  describe('should not fail', () => {
    it('retrieve content in default locale (en-US)', () =>
      __awaiter(void 0, void 0, void 0, function* () {
        const contentful = new contentful_1.Contentful({
          accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
          environment: process.env.CONTENTFUL_ENVIRONMENT,
          space: process.env.CONTENTFUL_SPACE,
        });
        yield contentful.initialize();
        const harmonizedData = yield contentful.getEntry({
          entryId: process.env.CONTENTFUL_ENTRY,
        });
        expect(harmonizedData).toMatchSnapshot();
      }));
    it('retrieve only root level of content in default locale (en-US)', () =>
      __awaiter(void 0, void 0, void 0, function* () {
        const contentful = new contentful_1.Contentful({
          accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
          environment: process.env.CONTENTFUL_ENVIRONMENT,
          space: process.env.CONTENTFUL_SPACE,
        });
        yield contentful.initialize();
        const harmonizedData = yield contentful.getEntry({
          entryId: process.env.CONTENTFUL_ENTRY,
          nestedLevels: 0,
        });
        expect(harmonizedData).toMatchSnapshot();
      }));
    it('retrieve content in specific locale `es`', () =>
      __awaiter(void 0, void 0, void 0, function* () {
        const contentful = new contentful_1.Contentful({
          accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
          environment: process.env.CONTENTFUL_ENVIRONMENT,
          space: process.env.CONTENTFUL_SPACE,
        });
        yield contentful.initialize();
        const harmonizedData = yield contentful.getEntry({
          entryId: process.env.CONTENTFUL_ENTRY,
          locale: 'es',
        });
        expect(harmonizedData).toMatchSnapshot();
      }));
  });
});
