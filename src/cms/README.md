## CLI
Install [Contentful CLI](https://www.contentful.com/developers/docs/tutorials/cli/import-and-export/#requirements) or alternatively use `npx contentful`

## Environment Variables
 
 1. You have to create a space in contentful to run the tests.
 2. Follow the instructions [here](https://www.contentful.com/developers/docs/references/authentication/#the-content-delivery-and-preview-api) to create an API key.
 3. Setup your `.env` file as follows

```text
CONTENTFUL_ACCESS_TOKEN=<your_access_token>
CONTENTFUL_ENVIRONMENT=<your_environment>
CONTENTFUL_SPACE=<your_space>
CONTENTFUL_ENTRY=<your_entry>
```

## Import dummy content to your space
To run the e2e tests you need to be authenticated in your contentful account and import the dummy content into the space you created before. The content you need to import is located at __tests__/exports/contentful/agnostic-cms-harmonizer_space.json and should not be updated.

To log in to your contentful account run the following command and follow the instructions in the terminal:

# If you have the contenful-cli installed globally
contenful login

# If you don't have the contenful-cli installed globally
npx contentful-cli login
To import the dummy content run the following command:

# If you have the contenful-cli installed globally
contentful space import --content-file __tests__/exports/contentful/agnostic-cms-harmonizer_space.json --space-id <your-contentful-space-id> --environment-id <your-contentful-environment-id>

# If you don't have the contenful-cli installed globally
npx contentful-cli space import --content-file __tests__/exports/contentful/agnostic-cms-harmonizer_space.json --space-id <your-contentful-space-id> --environment-id <your-contentful-environment-id>
There is also a located at ./__tests__/exports/contentful/config.json in case you need to export your space's content for any reason. You just need to run the following command:

# If you have the contenful-cli installed globally
contentful space export --config ./__tests__/exports/contentful/config.json --space-id <your-contentful-space-id> --environment-id <your-contentful-environment-id>

# If you don't have the contenful-cli installed globally
npx contentful-cli space export --config ./__tests__/exports/contentful/config.json --space-id <your-contentful-space-id> --environment-id <your-contentful-environment-id>
