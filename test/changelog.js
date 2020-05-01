'use strict';

const expect = require('chai').expect;
const changelog = require(__dirname + '/../src/changelog');
const convention = require(__dirname + '/../src/convention');

module.exports = function () {
    suite('changelog', function () {
        test('test changelog render', function (done) {
            changelog
                .render(
                    [],
                    // owner, repo, versions, links
                    'williamdes',
                    'wdes/changelog',
                    [
                        {
                            nbrCommits: 1,
                            name: 'v1.0.0',
                            changes: [
                                {
                                    name: 'Added',
                                    messageRegex: [/^added:\s/i, /^add:/i, /^test:/i],
                                    commits: [
                                        {
                                            hash: 'd2c9361',
                                            longHash: 'd2c9361467b0e67e4c7a1bbfa092b342363450cc',
                                            msg: 'Added blabla blabla',
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                    [
                        {
                            name: 'v1.0.0',
                            start: '185050ec502f20b3280df46485605e99563d1e87',
                            end: 'HEAD',
                        },
                    ],
                    __dirname + '/../src/CHANGELOG.twig'
                )
                .then((html) => {
                    expect(html).to.equal(
                        `# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [v1.0.0]

### Added

- [d2c9361](https://github.com/williamdes/wdes/changelog/commit/d2c9361467b0e67e4c7a1bbfa092b342363450cc) Added blabla blabla


[v1.0.0]: https://github.com/williamdes/wdes/changelog/compare/185050ec502f20b3280df46485605e99563d1e87...HEAD
`
                    );
                    done();
                })
                .catch(done);
        });
        test('test count commits in changes', function (done) {
            const count = changelog.countCommitsInChanges([
                {
                    name: 'Changes',
                    messageRegex: [/^added:\s/i, /^add:/i, /^test:/i],
                    commits: [
                        {
                            hash: 'd2c9361',
                            longHash: 'd2c9361467b0e67e4c7a1bbfa092b342363450cc',
                            msg: 'Added blabla blabla',
                        },
                    ],
                },
            ]);
            expect(count).to.equal(1);
            done();
        });
        test('test find changes block for a message dataset-1', function (done) {
            const changesBlockToFind = {
                name: 'Added',
                messageRegex: [/^added:/i, /^add:/i, /^test:/i],
                commits: [],
            };
            const goodBlock = changelog.findChangesBlockForMessage([changesBlockToFind], 'added: test a cool feature');
            expect(goodBlock).to.equal(changesBlockToFind);
            done();
        });
        test('test find changes block for a message dataset-2', function (done) {
            const changesBlocks = convention.getDefaultChangesBlock('williamdes');
            const goodBlock = changelog.findChangesBlockForMessage(changesBlocks, 'fixed: .npmignore');
            expect(goodBlock).to.equal(changesBlocks[4]);
            done();
        });
        test('test find changes block for a message dataset-3', function (done) {
            const changesBlocks = convention.getDefaultChangesBlock('williamdes');
            changesBlocks[1].commits.push({
                msg: 'updated: package version to 1.1.0',
                hash: 'b32b88e',
                longHash: 'b32b88e2b3f30f0fdc9c854a58b422fe5e20a864',
            });
            const goodBlock = changelog.findChangesBlockForMessage(changesBlocks, 'updated: changelog for 1.0.1');
            expect(goodBlock).to.equal(changesBlocks[1]);
            done();
        });
        test('test find changes block for a message dataset-4', function (done) {
            const changesBlocks = convention.getDefaultChangesBlock('williamdes');
            const goodBlock = changelog.findChangesBlockForMessage(changesBlocks, 'added: prettier config');
            expect(goodBlock).to.equal(changesBlocks[0]);
            done();
        });
        test('test find changes block for a message dataset-5', function (done) {
            const changesBlocks = convention.getDefaultChangesBlock('williamdes');
            changesBlocks[4].commits.push(
                {
                    msg: 'fixed: changelog',
                    hash: '9f7c555',
                    longHash: '9f7c555a02a971ed2d28bbc57b9ea4698923ed4c',
                },
                {
                    msg: 'fixed: tests',
                    hash: 'aa31da7',
                    longHash: 'aa31da7c86785c0362188f1912f00975d73a9b00',
                }
            );
            const goodBlock = changelog.findChangesBlockForMessage(changesBlocks, 'fixed: .npmignore');
            expect(goodBlock).to.equal(changesBlocks[4]);
            done();
        });
        test('test get default changes block', function (done) {
            const changesBlockToFind = {
                name: 'Added',
                messageRegex: [/^added:/i, /^add:/i, /^test:/i],
                commits: [],
            };
            const items = convention.getDefaultChangesBlock('williamdes');
            expect(items[0]).to.deep.equal(changesBlockToFind);
            items[0].commits.push({
                hash: 'd2c9361',
                longHash: 'd2c9361467b0e67e4c7a1bbfa092b342363450cc',
                msg: 'Added blabla blabla',
            });
            // This tests that the object is not passed by reference
            expect(convention.getDefaultChangesBlock('williamdes')[0]).to.deep.equal(changesBlockToFind);
            done();
        });
        test('test conventional+legacy convention', function (done) {
            const changesBlockToFind = {
                name: 'Added',
                messageRegex: [/^added:/i, /^add:/i, /^test:/i],
                commits: [],
            };
            const items = convention.getDefaultChangesBlock('conventional+legacy');
            expect(items[0]).to.deep.equal(changesBlockToFind);
            items[0].commits.push({
                hash: 'd2c9361',
                longHash: 'd2c9361467b0e67e4c7a1bbfa092b342363450cc',
                msg: 'Added blabla blabla',
            });
            // This tests that the object is not passed by reference
            expect(convention.getDefaultChangesBlock('conventional+legacy')[0]).to.deep.equal(changesBlockToFind);
            done();
        });
        test('test allchanges convention', function (done) {
            const changesBlockToFind = {
                name: '',
                messageRegex: [/^.*$/i],
                commits: [],
            };
            const items = convention.getDefaultChangesBlock('allchanges');
            expect(items[0]).to.deep.equal(changesBlockToFind);
            items[0].commits.push({
                hash: 'd2c9361',
                longHash: 'd2c9361467b0e67e4c7a1bbfa092b342363450cc',
                msg: 'Added blabla blabla',
            });
            // This tests that the object is not passed by reference
            expect(convention.getDefaultChangesBlock('allchanges')[0]).to.deep.equal(changesBlockToFind);
            done();
        });
        test('test unknown convention', function (done) {
            const items = convention.getDefaultChangesBlock('unknown');
            expect(items).to.deep.equal([]);
            done();
        });
    });
};
