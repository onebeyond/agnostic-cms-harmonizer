# Agnostic CMS harmonizer

<p align="center">
  <a href="https://img.shields.io/github/all-contributors/onebeyond/agnostic-cms-harmonizer?color=ee8449&style=flat-square" target="_blank"><img src="https://img.shields.io/github/all-contributors/onebeyond/agnostic-cms-harmonizer?color=ee8449&style=flat-square" alt="all-contributors" /></a>
</p>

Library to handle communication with different CMSs in a user-agnostic way.

## Contribute
To contribute to this project, you need to follow the next steps:

## Tests

At this point, no further configuration is required to run the _**unit tests**_.
```bash
npm run test
```

More of the same, for the _**E2E**_ tests. Here it is crucial to have configured our `.env` and imported the dummy content to our space.
```bash
npm run test:e2e
```

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
