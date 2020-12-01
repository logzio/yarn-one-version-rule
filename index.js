const path = require('path');
const { execSync } = require('child_process');

function getAllDependenciesVersions({ ignorePackages = [], rootDir = path.resolve(__dirname, '../'), verbose = false }) {
  rootDir = path.resolve(rootDir)

  if (verbose) {
    ignorePackages.length ? console.info(`ignoring packages: ${ignorePackages}`) : console.info(`not ignoring any package`)
    rootDir && console.info(`using root dir: ${rootDir}`);
  }

  let yarnWorkspaceJsonString = execSync('yarn workspaces --silent info', {
    cwd: rootDir,
    encoding: 'utf8'
  }).toString();
  const allPackagesWorkspaces = JSON.parse(yarnWorkspaceJsonString.replace(`[2K[1G`, ''));
  const rootWorkspace = {
    "location": rootDir,
  };
  let allWorkspaces = { root: rootWorkspace, ...allPackagesWorkspaces };

  if (verbose) {
    console.info(`found tree:\n`, allWorkspaces);
  }

  const allDeps = {};
  Object.values(allWorkspaces).forEach(workspace => {
    const packageJson = require(path.resolve(rootDir, workspace.location, 'package.json'));

    const allDependencies = [
      ...Object.entries(packageJson.dependencies || {}),
      ...Object.entries(packageJson.devDependencies || {}),
    ];

    allDependencies.forEach(([dep, version]) => {

      if (!allDeps[dep]) {
        allDeps[dep] = {
          versions: [version],
          dep,
        };

        return;
      }

      if (!allDeps[dep].versions.includes(version)) {
        allDeps[dep].versions.push(version);
        if (!ignorePackages.includes(dep)) {
          allDeps[dep].haveConflicts = true;
        }
      }
    });
  });
  return allDeps;
}

module.exports = {
  getAllDependenciesVersions
}
