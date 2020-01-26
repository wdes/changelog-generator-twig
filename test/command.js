'use strict';

const expect = require('chai').expect;
const { exec } = require('child_process');

module.exports = function() {
    suite('command', function() {
        const pathBin = __dirname + '/../bin/changelog-generator-twig.js';
        test('test command', function(done) {
            exec(
                pathBin + ' --owner testowner --repo test/repo --repoDir ' + __dirname + ' --baseCommit ' + 'HEAD',
                (err, stdout) => {
                    if (err) {
                        done(err);
                    } else {
                        expect(stdout).to.contain(
                            '# Changelog\nAll notable changes to this project will be documented in this file.\n\nThe format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)\nand this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).'
                        );
                        done();
                    }
                }
            );
        });
        test('test command custom template', function(done) {
            exec(
                pathBin +
                    ' --owner testowner --repo test/repo --repoDir ' +
                    __dirname +
                    ' --template ' +
                    __dirname +
                    '/../src/CHANGELOG.twig' +
                    ' --baseCommit ' +
                    'HEAD' +
                    '/../CHANGELOG.twig',
                (err, stdout) => {
                    if (err) {
                        done(err);
                    } else {
                        expect(stdout).to.contain(
                            '# Changelog\nAll notable changes to this project will be documented in this file.\n\nThe format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)\nand this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).'
                        );
                        done();
                    }
                }
            );
        });
        test('test command custom template with error in repo dir', function(done) {
            const repoDir = __dirname + 'typo';
            exec(
                pathBin +
                    ' --owner testowner --repo test/repo --repoDir ' +
                    repoDir +
                    ' --template ' +
                    __dirname +
                    '/../src/CHANGELOGooops.twig' +
                    ' --baseCommit ' +
                    'HEAD' +
                    '/../CHANGELOG.twig',
                (err, stdout) => {
                    if (err) {
                        done(err);
                    } else {
                        expect(stdout).to.equal('Directory ' + repoDir + ' does not exist!');
                        done();
                    }
                }
            );
        });
        test('test command custom template with error in template name', function(done) {
            const templateFile = __dirname + '/../src/CHANGELOGooops.twig';
            exec(
                pathBin +
                    ' --owner testowner --repo test/repo --repoDir ' +
                    __dirname +
                    ' --template ' +
                    templateFile +
                    ' --baseCommit ' +
                    'HEAD' +
                    '/../CHANGELOG.twig',
                (err, stdout) => {
                    if (err) {
                        done(err);
                    } else {
                        expect(stdout).to.equal('File ' + templateFile + ' does not exist!\n');
                        done();
                    }
                }
            );
        });
    });
};
