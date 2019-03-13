'use strict';

const expect = require('chai').expect;
const changelog = require(__dirname + '/../src/changelog');

module.exports = function() {
    suite('changelog', function() {
        test('test changelog render', function(done) {
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
                            changesAdded: [
                                {
                                    hash: 'd2c9361',
                                    longHash: 'd2c9361467b0e67e4c7a1bbfa092b342363450cc',
                                    msg: 'Added blabla blabla',
                                },
                            ],
                            changesChanged: [],
                            changesDeprecated: [],
                            changesRemoved: [],
                            changesFixed: [],
                            changesSecurity: [],
                            changesImprove: [],
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
                .then(html => {
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
    });
};
