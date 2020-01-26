'use strict';

const changelog = require(__dirname + '/changelog');

module.exports = (args, repoDir, owner, repo, headName, baseCommit, templateFile, conventionMode) => {
    changelog
        .getVersions(headName, baseCommit, repoDir, conventionMode)
        .then(versionInfo => {
            changelog
                .render(args, owner, repo, versionInfo.versions, versionInfo.links, templateFile)
                .then(html => console.log(html))
                .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
};
