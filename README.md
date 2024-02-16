# Agnostic CMS harmonizer

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
