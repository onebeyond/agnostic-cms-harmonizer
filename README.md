# Agnostic CMS harmonizer
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

Library to handle communication with different CMSs in a user-agnostic way.

## Contribute

In order to contribute to this project, you need to follow the next steps:

### Requirements

- [contentful requirements](https://www.contentful.com/developers/docs/tutorials/cli/import-and-export/#requirements)
- If you don't want to install the contentful CLI you can use the `npx` command to run it without installing it globally, as it's an optional dependency.

### Contentful

1. You have to create a space in contentful to run the tests.
2. Following the instructions [here](https://www.contentful.com/developers/docs/references/authentication/#the-content-delivery-and-preview-api) to create an API key.

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
contentful space import --content-file __tests__/exports/contentful/agnostic-cms-harmonizer_space.json --space-id <your-contentful-space-id>

# If you don't have the contenful-cli installed globally
npx contentful-cli space import --content-file __tests__/exports/contentful/agnostic-cms-harmonizer_space.json --space-id <your-contentful-space-id>
```

There is also a config file provided in case you need to [export](https://www.contentful.com/developers/docs/tutorials/cli/import-and-export/#exporting-content) your space's content for any reason `./__tests__/exports/contentful/config.json`. You just need to change the `spaceId` and `environmentId` variables locally and run the following command:

```bash
# If you have the contenful-cli installed globally
contentful space export --config ./__tests__/exports/contentful/config.json

# If you don't have the contenful-cli installed globally
npx contentful-cli space export --config ./__tests__/exports/contentful/config.json
```

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/inigomarquinez"><img src="https://avatars.githubusercontent.com/u/25435858?v=4?s=100" width="100px;" alt="Íñigo Marquínez Prado"/><br /><sub><b>Íñigo Marquínez Prado</b></sub></a><br /><a href="https://github.com/onebeyond/agnostic-cms-harmonizer/commits?author=inigomarquinez" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Bounteous17"><img src="https://avatars.githubusercontent.com/u/16175933?v=4?s=100" width="100px;" alt="Àlex Serra"/><br /><sub><b>Àlex Serra</b></sub></a><br /><a href="https://github.com/onebeyond/agnostic-cms-harmonizer/commits?author=Bounteous17" title="Code">💻</a> <a href="https://github.com/onebeyond/agnostic-cms-harmonizer/commits?author=Bounteous17" title="Tests">⚠️</a> <a href="https://github.com/onebeyond/agnostic-cms-harmonizer/commits?author=Bounteous17" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.one-beyond.com"><img src="https://avatars.githubusercontent.com/u/88377077?v=4?s=100" width="100px;" alt="Matyas Angyal"/><br /><sub><b>Matyas Angyal</b></sub></a><br /><a href="https://github.com/onebeyond/agnostic-cms-harmonizer/pulls?q=is%3Apr+reviewed-by%3Amatyasjay" title="Reviewed Pull Requests">👀</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!