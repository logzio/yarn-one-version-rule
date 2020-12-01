<p align="center">
  <a href="http://logz.io">
    <img height="150px" src="https://logz.io/wp-content/uploads/2017/06/new-logzio-logo.png">
  </a>
</p>


# yarn-one-version-rule
Enforce the One Version Rule on yarn workspaces


## Quick Start
```sh
npx yarn-one-version-rule
```

## Global install
```sh
yarn add global yarn-one-version-rule

yarn-one-version-rule
```

## Options
```
yarn-one-version-rule --help

Options:
      --version  Show version number                                   [boolean]
  -i, --ignore   list of packages to ignore in case of conflict          [array]
  -r, --root     the root dir of your workspaces                        [string]
  -v, --verbose  log extra info                                        [boolean]
  -h, --help     Show help                                             [boolean]
```

## Ignore certain packages

```sh
npx yarn-one-version-rule --ignore=webpack --ignore=lodash
```
