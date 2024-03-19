# Agnostic CMS Harmonizer

An agnostic library to handle communication with multiple CMS in an agnostic way.

![NPM Version](https://img.shields.io/npm/v/%40onebeyond%2Fagnostic-cms-harmonizer)
![GitHub Release Date](https://img.shields.io/github/release-date/onebeyond/agnostic-cms-harmonizer)
[![maintainability](https://api.codeclimate.com/v1/badges/9c8389517a18ceabc76d/maintainability)](https://codeclimate.com/github/onebeyond/agnostic-cms-harmonizer/maintainability)
[![Socket](https://socket.dev/api/badge/npm/package/@onebeyond/agnostic-cms-harmonizer)](https://socket.dev/npm/package/@onebeyond/agnostic-cms-harmonizer)

![NPM Downloads](https://img.shields.io/npm/dt/%40onebeyond%2Fagnostic-cms-harmonizer)
![all contributors](https://img.shields.io/github/all-contributors/onebeyond/agnostic-cms-harmonizer?color=ee8449&style=flat-square)
![LICENSE](https://img.shields.io/npm/l/%40onebeyond%2Fagnostic-cms-harmonizer)
![dependencies](https://img.shields.io/librariesio/github/onebeyond/agnostic-cms-harmonizer)
![NPM Unpacked Size](https://img.shields.io/npm/unpacked-size/%40onebeyond%2Fagnostic-cms-harmonizer)

Find the latest package version on the <em>One Beyond <a target="_blank" href="https://www.npmjs.com/package/@onebeyond/agnostic-cms-harmonizer">NPM Registry</a></em>

## [Documentation](https://onebeyond.github.io/agnostic-cms-harmonizer)

### TL;DR

Install the library via `npm`:

```sh
npm i @onebeyond/agnostic-cms-harmonizer
```

Use the harmonized providers:

```ts
 import { ContentfulClient } from '@onebeyond/agnostic-cms-harmonizer';
 
 const client = new ContentfulClient({
   accessToken,
   space,
   environment,
 });

 await client.init();

 const entry = await client.getEntry<MyEntry>({ entryId: '123' });

 const collection = await client.getCollection<MyCollection>({ collectionId: '123' });
```

The library exposes a common interface for multiple CMSs and outputs [harmonized data](https://onebeyond.github.io/agnostic-cms-harmonizer/types/_types_output.HarmonizedOutput.html) instead raw responses.

Each CMS [provider](https://onebeyond.github.io/agnostic-cms-harmonizer/classes/index_abstract.AbstractProvider.html) exposes the [`getEntry`](https://onebeyond.github.io/agnostic-cms-harmonizer/classes/index_abstract.AbstractProvider.html#getEntry) and [`getCollection`](https://onebeyond.github.io/agnostic-cms-harmonizer/classes/index_abstract.AbstractProvider.html#getCollection) methods to request one or multiple entries accordingly.

First, supply the vendor-related configuration parameters to the constructor:

```ts
const cmsClient = new CmsClient(vendorConfigurationObject)
```

The client instance _must_ call the `init()` method to configure the provider before attempting to request data from the CMS:

```ts
await client.init();
```

Now use the harmonizer methods of the `cmsCLient`.

```ts
 const entry = await client.getEntry<MyEntry>({ entryId: '123' });

 const collection = await client.getCollection<MyCollection>({ collectionId: '123' });
```

Enjoy!

## Development

### CLI
Install [Contentful CLI](https://www.contentful.com/developers/docs/tutorials/cli/import-and-export/#requirements) or alternatively use `npx contentful-cli`

### Environment Variables

 1. You have to create a space in contentful to run the tests.
 2. Follow the instructions [here](https://www.contentful.com/developers/docs/references/authentication/#the-content-delivery-and-preview-api) to create an API key.
 3. Setup your `.env` file as follows

 ```
 CONTENTFUL_ACCESS_TOKEN=your_access_token
 CONTENTFUL_ENVIRONMENT=your_environment
 CONTENTFUL_SPACE=your_space
 CONTENTFUL_ENTRY=your_entry
 ```

### Testing

#### Import Content

To run the `e2e` tests you need to be authenticated in your contentful account and [import](https://www.contentful.com/developers/docs/tutorials/cli/import-and-export/#importing-content) the dummy content into the space you created before. The content you need to import is located at `__tests__/exports/contentful/agnostic-cms-harmonizer_space.json` and should not be updated.

Login to Contentful and import test content with the CLI:

```bash
contenful login

contentful space import --content-file __tests__/exports/contentful/agnostic-cms-harmonizer_space.json --space-id <your-contentful-space-id> --environment-id <your-contentful-environment-id>
```

Or by using NPX:

```bash
npx contentful-cli login

npx contentful-cli space import --content-file __tests__/exports/contentful/agnostic-cms-harmonizer_space.json --space-id <your-contentful-space-id> --environment-id <your-contentful-environment-id>
```

#### Export Content

To update the test content you need to [export](https://www.contentful.com/developers/docs/tutorials/cli/import-and-export/#exporting-content) the updated content from Contentful. 

Export the content using the CLI
```bash
contentful space export --config ./__tests__/exports/contentful/config.json --space-id <your-contentful-space-id> --environment-id <your-contentful-environment-id>
```

Or by using NPX:

```bash
npx contentful-cli space export --config ./__tests__/exports/contentful/config.json --space-id <your-contentful-space-id> --environment-id <your-contentful-environment-id>
```

#### Continous Integration
The pipeline is configured to use the Contentful space managed by the _**agnostic.cms.harmonizer@proton.me**_ account during the _**E2E**_ tests execution. If the content of these tests needs to be updated in the provider, you must have access to this [vault](https://beyondsecure.onebeyond.cloud/vaults/OB-BpuUbMukgIKDSxGqmypk/secrets), otherwise, you can open an issue referencing the new content exported.

#### Run the test suites

- Run unit tests

```sh
npm run test
```

- Run end to end tests

```sh
npm run test:e2e
```

### Documentation

The project uses `tsdoc` to generate the technical documentation from the source code.

- Build the documentation
```sh
npm run docs:build
```

- Run in _watch mode_ to look for file changes and update immediately
```sh
npm run docs:build:watch
```

- Serve the build output statically
```sh
npm run docs:serve
```

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/inigomarquinez"><img src="https://avatars.githubusercontent.com/u/25435858?v=4?s=100" width="100px;" alt="Íñigo Marquínez Prado"/><br /><sub><b>Íñigo Marquínez Prado</b></sub></a><br /><a href="https://github.com/onebeyond/agnostic-cms-harmonizer/commits?author=inigomarquinez" title="Code">💻</a> <a href="https://github.com/onebeyond/agnostic-cms-harmonizer/commits?author=inigomarquinez" title="Documentation">📖</a> <a href="https://github.com/onebeyond/agnostic-cms-harmonizer/pulls?q=is%3Apr+reviewed-by%3Ainigomarquinez" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Bounteous17"><img src="https://avatars.githubusercontent.com/u/16175933?v=4?s=100" width="100px;" alt="Àlex Serra"/><br /><sub><b>Àlex Serra</b></sub></a><br /><a href="https://github.com/onebeyond/agnostic-cms-harmonizer/commits?author=Bounteous17" title="Code">💻</a> <a href="https://github.com/onebeyond/agnostic-cms-harmonizer/commits?author=Bounteous17" title="Tests">⚠️</a> <a href="https://github.com/onebeyond/agnostic-cms-harmonizer/commits?author=Bounteous17" title="Documentation">📖</a> <a href="https://github.com/onebeyond/agnostic-cms-harmonizer/pulls?q=is%3Apr+reviewed-by%3ABounteous17" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.one-beyond.com"><img src="https://avatars.githubusercontent.com/u/88377077?v=4?s=100" width="100px;" alt="Matyas Angyal"/><br /><sub><b>Matyas Angyal</b></sub></a><br /><a href="https://github.com/onebeyond/agnostic-cms-harmonizer/pulls?q=is%3Apr+reviewed-by%3Amatyasjay" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/onebeyond/agnostic-cms-harmonizer/commits?author=matyasjay" title="Code">💻</a> <a href="https://github.com/onebeyond/agnostic-cms-harmonizer/commits?author=matyasjay" title="Documentation">📖</a> <a href="https://github.com/onebeyond/agnostic-cms-harmonizer/commits?author=matyasjay" title="Tests">⚠️</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://ulisesgascon.com/"><img src="https://avatars.githubusercontent.com/u/5110813?v=4?s=100" width="100px;" alt="Ulises Gascón"/><br /><sub><b>Ulises Gascón</b></sub></a><br /><a href="https://github.com/onebeyond/agnostic-cms-harmonizer/pulls?q=is%3Apr+reviewed-by%3AUlisesGascon" title="Reviewed Pull Requests">👀</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
