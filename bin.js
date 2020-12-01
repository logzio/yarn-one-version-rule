#!/usr/bin/env node
const yargs = require('yargs');
const { getAllDependenciesVersions } = require('./index');


const argv = yargs
  .option('ignore', {
    alias: 'i',
    description: 'list of packages to ignore in case of conflict',
    type: 'array',
  })
  .option('root', {
    alias: 'r',
    description: 'the root dir of your workspaces',
    type: 'string',
  })
  .option('verbose', {
    alias: 'v',
    description: 'log extra info',
    type: 'boolean',
  })
  .help()
  .alias('help', 'h')
  .argv;

if (argv.verbose) {
  console.info(`running in verbose mode`);
}
const depsWithDuplicatedPackagesVersions = Object.values(getAllDependenciesVersions({
  ignorePackages: argv.ignore,
  rootDir: argv.root,
  verbose: argv.verbose,
})).filter(({ haveConflicts }) => haveConflicts);

if (depsWithDuplicatedPackagesVersions.length > 0) {
  console.error(`you have several declarations of packages with different versions`);
  depsWithDuplicatedPackagesVersions.forEach(info => {
    console.error(`package: ${info.dep} have multiple version declarations ${info.versions.join(', ')}`);
  });
  console.error(`more about the "One Version Rule" https://opensource.google/docs/thirdparty/oneversion/`);
  process.exit(1);
}

console.info('All packages are synced with the same version');
if (argv.ignore) {
  console.info(`ignored packages: ${argv.ignore}`);
}
