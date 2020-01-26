#!/usr/bin/env node
'use strict';

const Twig = require('twig'); // Twig module
const git = require(__dirname + '/git');
const fs = require('fs');
const oFunctions = require(__dirname + '/oFunctions');

const countCommitsInChanges = function(changes) {
    return changes.map(item => item.commits.length).reduce((accumulator, currentVal) => accumulator + currentVal);
};

module.exports = {
    countCommitsInChanges: countCommitsInChanges,
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

                        if (record.body.match(/\[changelog skip\]/i) === null) {
                            changelog[lastTagName].push(record);
                        }
                    });
                    var links = [];
                    var versions = [];
                    for (var version in changelog) {
                        const changesAdded = [];
                        const changesChanged = [];
                        const changesDeprecated = [];
                        const changesRemoved = [];
                        const changesFixed = [];
                        const changesSecurity = [];
                        const changesImprove = [];
                        links.push({
                            name: version.trim().replace('HEAD', headName),
                            start: oFunctions.keys.next(changelog, version) || baseCommitHash,
                            end: version,
                        });
                        for (var commitid in changelog[version]) {
                            let changes = [];
                            let commit = changelog[version][commitid];
                            commit.time = parseInt(commit.time);
                            let msg = commit.msg.trim();
                            /*
                                if (msg.match(/^v([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$/gi)) {
                                    continue;
                                }
                            */
                            if (msg.match(/^added:\s/gi) || msg.match(/^add:/gi) || msg.match(/^test:/gi)) {
                                changes = changesAdded;
                            } else if (
                                msg.match(/^changed:/gi) ||
                                msg.match(/^update:/gi) ||
                                msg.match(/^updated:/gi) ||
                                msg.match(/^moved:/gi)
                            ) {
                                changes = changesChanged;
                            } else if (msg.match(/^deprecated:/gi)) {
                                changes = changesDeprecated;
                            } else if (msg.match(/^removed:/gi) || msg.match(/^remove:/gi)) {
                                changes = changesRemoved;
                            } else if (msg.match(/^fixed:/gi) || msg.match(/fix:/gi) || msg.match(/fixes:/gi)) {
                                changes = changesFixed;
                            } else if (msg.match(/^security:/gi)) {
                                changes = changesSecurity;
                            } else if (
                                msg.match(/^improve:/gi) ||
                                msg.match(/^improved:/gi) ||
                                msg.match(/^style:/gi)
                            ) {
                                changes = changesImprove;
                            }

                            changes.push({
                                msg: msg,
                                hash: changelog[version][commitid].hash.trim(),
                                longHash: changelog[version][commitid].longHash.trim(),
                            });
                        }
                        versions.push({
                            nbrCommits:
                                changesAdded.length +
                                changesChanged.length +
                                changesDeprecated.length +
                                changesRemoved.length +
                                changesFixed.length +
                                changesSecurity.length +
                                changesImprove.length,
                            name: version.replace('HEAD', headName),
                            changesAdded: changesAdded,
                            changesChanged: changesChanged,
                            changesDeprecated: changesDeprecated,
                            changesRemoved: changesRemoved,
                            changesFixed: changesFixed,
                            changesSecurity: changesSecurity,
                            changesImprove: changesImprove,
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
