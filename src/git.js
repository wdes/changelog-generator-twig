'use strict';

const simpleGit = require('simple-git');
const hash = Math.random() * 10e8; // A random separator ?

const log = (repoDir) => {
    return new Promise((resolve, reject) => {
        var git = simpleGit(repoDir);
        git.cwd(repoDir).then(() => {
            git.log({
                splitter: hash,
                format: {
                    tag: '%D',
                    note: '%N',
                    msg: '%s',
                    hash: '%h',
                    longHash: '%H',
                    author: '%ae',
                    signature: '%G?',
                    time: '%at',
                    body: '%b',
                },
            })
                .then((log) => {
                    resolve(log.all);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    });
};

const getLastTag = function (tagsString) {
    const regexTags = /tag\:\s*(?<tag>[a-z0-9_\.\/-]*)\,?/gi;
    const matchs = regexTags.exec(tagsString);
    if (matchs) {
        return matchs[1];
    } else {
        return null;
    }
};

module.exports = {
    getLastTag: getLastTag,
    log: log,
};
