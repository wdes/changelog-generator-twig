'use strict';

const expect = require('chai').expect;
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

module.exports = function () {
    suite('command', function () {
        const pathBin = __dirname + '/../bin/changelog-generator-twig.js';
        test('test command', function (done) {
            exec(
                pathBin + ' --owner testowner --repo test/repo --repoDir ' + __dirname + ' --baseCommit ' + 'HEAD',
                (err, stdout, stderr) => {
                    if (err) {
                        done(err);
                    } else {
                        expect(stdout).to.contain(
                            '# Changelog\nAll notable changes to this project will be documented in this file.\n\nThe format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)\nand this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).'
                        );
                        expect(stderr).to.equal('');
                        done();
                    }
                }
            );
        });
        test('test command custom template', function (done) {
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
                (err, stdout, stderr) => {
                    if (err) {
                        done(err);
                    } else {
                        expect(stdout).to.contain(
                            '# Changelog\nAll notable changes to this project will be documented in this file.\n\nThe format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)\nand this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).'
                        );
                        expect(stderr).to.equal('');
                        done();
                    }
                }
            );
        });
        test('test command custom template with error in repo dir', function (done) {
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
                (err, stdout, stderr) => {
                    if (err) {
                        done(err);
                    } else {
                        expect(stderr).to.equal('Directory ' + repoDir + ' does not exist!\n');
                        expect(stdout).to.equal('');
                        done();
                    }
                }
            );
        });
        test('test command custom template with a non git dir', function (done) {
            const repoDir = fs.mkdtempSync(path.join(os.tmpdir(), 'wdes-changelog'));
            exec(
                pathBin +
                    ' --owner testowner --repo test/repo --repoDir ' +
                    repoDir +
                    ' --template ' +
                    __dirname +
                    '/../src/CHANGELOG.twig' +
                    ' --baseCommit ' +
                    'HEAD' +
                    '/../CHANGELOG.twig',
                (err, stdout, stderr) => {
                    if (err) {
                        fs.rmdirSync(repoDir);
                        done(err);
                    } else {
                        expect(stdout).to.equal('');
                        expect(stderr).to.contain('Error: fatal:');
                        fs.rmdirSync(repoDir);
                        done();
                    }
                }
            );
        });
        test('test command custom template with error in template name', function (done) {
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
                (err, stdout, stderr) => {
                    if (err) {
                        done(err);
                    } else {
                        expect(stderr).to.equal('File ' + templateFile + ' does not exist!\n');
                        expect(stdout).to.equal('');
                        done();
                    }
                }
            );
        });
        test('test command custom template with error in template file', function (done) {
            const templateFile = __dirname + '/../src/CHANGELOG_error.twig';
            exec(
                pathBin +
                    ' --owner testowner --repo test/repo --repoDir ' +
                    __dirname +
                    ' --template ' +
                    templateFile +
                    ' --baseCommit ' +
                    'HEAD' +
                    '/../CHANGELOG.twig',
                (err, stdout, stderr) => {
                    expect(stderr).to.contain('errorhere function does not exist and is not defined in the context');
                    expect(stderr).to.contain('src/CHANGELOG_error.twig');
                    expect(stdout).to.equal('');
                    done();
                }
            );
        });
    });
};
