# Harmonizer

An agnostic library to handle communication with different CMSs in a user-agnostic way.

<p align="center">
  <img src="https://badge.fury.io/js/@onebeyond%2Fagnostic-cms-harmonizer.svg" />
  <a href="https://img.shields.io/github/all-contributors/onebeyond/agnostic-cms-harmonizer?color=ee8449&style=flat-square" target="_blank"><img src="https://img.shields.io/github/all-contributors/onebeyond/agnostic-cms-harmonizer?color=ee8449&style=flat-square" alt="all-contributors" /></a>
</p>

## [Documentation](https://onebeyond.github.io/agnostic-cms-harmonizer)

## TL;DR

```ts
 import { ContentfulClient } from '@onebeyond/agnostic-cms-harmonizer';
 
 const client = new ContentfulClient({
   accessToken,
   space,
   environment,
 });

 await client.init();

 const entry = await client.getEntry<MyEntry>({ entryId: '123' });
 console.log(entry); // { data: { title: 'My title', description: 'My description' } }
```


## Development

### Environment variables

Create a `.env` file in the root of the project with the following content:

```bash 
CONTENTFUL_ACCESS_TOKEN=your_access_token
CONTENTFUL_ENVIRONMENT=your_environment
CONTENTFUL_SPACE=your_space
CONTENTFUL_ENTRY=your_entry
```

### Import dummy content to your space

To run the `e2e` tests you need to be authenticated in your contentful account and [import](https://www.contentful.com/developers/docs/tutorials/cli/import-and-export/#importing-content) the dummy content into the space you created before. The content you need to import is located at `__tests__/exports/contentful/agnostic-cms-harmonizer_space.json` and should not be updated.

To log in to your contentful account run the following command and follow the instructions in the terminal:

```bash
# If you have the contenful-cli installed globally
contenful login

# If you don't have the contenful-cli installed globally
npx contentful-cli login
```

To import the dummy content run the following command:

```bash
# If you have the contenful-cli installed globally
contentful space import --content-file __tests__/exports/contentful/agnostic-cms-harmonizer_space.json --space-id <your-contentful-space-id> --environment-id <your-contentful-environment-id>

# If you don't have the contenful-cli installed globally
npx contentful-cli space import --content-file __tests__/exports/contentful/agnostic-cms-harmonizer_space.json --space-id <your-contentful-space-id> --environment-id <your-contentful-environment-id>
```

There is also a  located at `./__tests__/exports/contentful/config.json` in case you need to [export](https://www.contentful.com/developers/docs/tutorials/cli/import-and-export/#exporting-content) your space's content for any reason. You just need to run the following command:

```bash
# If you have the contenful-cli installed globally
contentful space export --config ./__tests__/exports/contentful/config.json --space-id <your-contentful-space-id> --environment-id <your-contentful-environment-id>

# If you don't have the contenful-cli installed globally
npx contentful-cli space export --config ./__tests__/exports/contentful/config.json --space-id <your-contentful-space-id> --environment-id <your-contentful-environment-id>
```

```sh
npm run test

npm run test:e2e
```

### Content Update
The pipeline is configured to use the Contentful space managed by the _**agnostic.cms.harmonizer@proton.me**_ account during the _**E2E**_ tests execution. If the content of these tests needs to be updated in the provider, you must have access to this [vault](https://beyondsecure.onebeyond.cloud/vaults/OB-BpuUbMukgIKDSxGqmypk/secrets), otherwise, you can open an issue referencing the new content exported.

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
