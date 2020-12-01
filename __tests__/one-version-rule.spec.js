const path = require('path')
const { getAllDependenciesVersions } = require('../index');

describe('One Version Rule', function () {
  it('should get all dependencies versions', function () {
    const allDeps = getAllDependenciesVersions({ rootDir: path.resolve(__dirname) })
    expect(allDeps).toMatchObject({
      "lodash": { "dep": "lodash", "versions": ["4.17.20"] },
      "moment": { "dep": "moment", "haveConflicts": true, "versions": ["2.28.0", "2.29.0"] },
      "react": { "dep": "react", "versions": ["17.0.0"] },
      "axios": { "dep": "axios", "versions": ["0.21.0"] }
    })
  });
});
