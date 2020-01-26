#!/usr/bin/env node
'use strict';

const Twig = require('twig'); // Twig module
const git = require(__dirname + '/git');
const fs = require('fs');
const oFunctions = require(__dirname + '/oFunctions');

const countCommitsInChanges = function(changes) {
    return changes.map(item => item.commits.length).reduce((accumulator, currentVal) => accumulator + currentVal);
};

const findChangesBlockForMessage = function(changes, msg) {
    return changes.find(change => {
        return change.messageRegex.some(rx => rx.test(msg));
    });
};

const getDefaultChangesBlock = function() {
    return [
        {
            commits: [],
            name: 'Added',
            messageRegex: [/^added:/i, /^add:/i, /^test:/i],
        },
        {
            commits: [],
            name: 'Changed',
            messageRegex: [/^changed:/i, /^update:/i, /^updated:/i, /^moved:/i],
        },
        {
            commits: [],
            name: 'Deprecated',
            messageRegex: [/^deprecated:/i],
        },
        {
            commits: [],
            name: 'Removed',
            messageRegex: [/^removed:/i, /^remove:/i],
        },
        {
            commits: [],
            name: 'Fixed',
            messageRegex: [/^fixed:/i, /^fix:/i, /^fixes:/i],
        },
        {
            commits: [],
            name: 'Security',
            messageRegex: [/^security:/i],
        },
        {
            commits: [],
            name: 'Improvements',
            messageRegex: [/^improve:/i, /^improved:/i, /^style:/i],
        },
    ];
};

module.exports = {
    countCommitsInChanges: countCommitsInChanges,
    findChangesBlockForMessage: findChangesBlockForMessage,
    getDefaultChangesBlock: getDefaultChangesBlock,
    getVersions: (headName, baseCommitHash, repoDir) => {
        return new Promise((resolve, reject) => {
            var changelog = {
                HEAD: [],
            };
            if (!fs.existsSync(repoDir)) {
                reject('Directory ' + repoDir + ' does not exist!');
                return;
            }

            git.log(repoDir)
                .then(records => {
                    var lastTagName = 'HEAD';
                    records.forEach(record => {
                        let lastTag = git.getLastTag(record.tag);
                        if (lastTag !== null) {
                            lastTagName = lastTag;
                            changelog[lastTagName] = [];
                        }

                        if (record.body.includes('[changelog skip]') === false) {
                            changelog[lastTagName].push(record);
                        }
                    });
                    var links = [];
                    var versions = [];
                    for (var version in changelog) {
                        let changes = getDefaultChangesBlock();
                        links.push({
                            name: version.trim().replace('HEAD', headName),
                            start: oFunctions.keys.next(changelog, version) || baseCommitHash,
                            end: version,
                        });
                        for (var commitid in changelog[version]) {
                            let commit = changelog[version][commitid];
                            commit.time = parseInt(commit.time);
                            let msg = commit.msg.trim();

                            const block = findChangesBlockForMessage(changes, msg);
                            if (block && typeof block.commits === 'object') {
                                block.commits.push({
                                    msg: msg,
                                    hash: changelog[version][commitid].hash.trim(),
                                    longHash: changelog[version][commitid].longHash.trim(),
                                });
                            }
                        }
                        versions.push({
                            nbrCommits: countCommitsInChanges(changes),
                            name: version.replace('HEAD', headName),
                            changes: changes,
                        });
                    }
                    resolve({
                        changelog: changelog,
                        versions: versions,
                        links: links,
                    });
                })
                .catch(reject);
        });
    },
    render: (args, owner, repo, versions, links, templateFile) => {
        return new Promise((resolve, reject) => {
            if (!fs.existsSync(templateFile)) {
                reject('File ' + templateFile + ' does not exist!');
                return;
            }
            Twig.renderFile(
                templateFile,
                {
                    args: args,
                    versions: versions,
                    links: links,
                    owner: owner,
                    repo: repo,
                },
                (err, html) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(html);
                    }
                }
            );
        });
    },
};
