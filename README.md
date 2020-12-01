<p align="center">
  <a href="http://logz.io">
    <img height="150px" src="https://logz.io/wp-content/uploads/2017/06/new-logzio-logo.png">
  </a>
</p>


# yarn-one-version-rule
Enforce the One Version Rule when working wth yarn workspaces.  
When working with a monorepo, you want to have one version for each 3rd party package you import.  
The benefits are:  
1. reducing collisions on runtime when importing two versions of the same package.
2. reduce installation and fetching time
3. supporting only specific version is easier when working on a big monreporo

More info from google [The One Version Rule](https://opensource.google/docs/thirdparty/oneversion)


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

### Example output
```sh
npx yarn-one-version-rule

you have several declarations of packages with different versions
package: @babel/runtime have multiple version declarations ^7.7.7, 7.12.1
package: inquirer have multiple version declarations 7.3.3, 6.3.1
package: ts-loader have multiple version declarations 6.2.2, 8.0.11
more about the "One Version Rule" https://opensource.google/docs/thirdparty/oneversion/
```

