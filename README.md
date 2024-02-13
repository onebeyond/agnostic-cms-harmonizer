# agnostic-cms-harmonizer
Library to manage the communication with any CMS agnostic to the user

## Contribute

#### Testing

###### e2e

For being able to run the `e2e` tests you would need to **import the Contentful space** [following this steps](https://www.contentful.com/developers/docs/tutorials/cli/import-and-export/). The exported space is located at `__tests__/exports/contentful/agnostic-cms-harmonizer_space.json` and should not be updated. There is also a config file provided in case you need to export your space for any reason `./__tests__/exports/contentful/config.json`

```bash
npx contentful-cli space export --config ./__tests__/exports/contentful/config.json
```