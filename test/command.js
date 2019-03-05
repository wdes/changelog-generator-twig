"use strict";

const expect = require("chai").expect;
const { exec } = require("child_process");

module.exports = function() {
    suite("command", function() {
        test("test command", function(done) {
            let pathBin = __dirname + "/../bin/changelog-generator-twig.js";
            exec(
                pathBin +
                    " --owner testowner --repo test/repo --repoDir " +
                    __dirname +
                    " --baseCommit " +
                    "HEAD",
                (err, stdout) => {
                    if (err) {
                        done(err);
                    } else {
                        expect(stdout).to.contain(
                            "# Changelog\nAll notable changes to this project will be documented in this file.\n\nThe format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)\nand this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html)."
                        );
                        done();
                    }
                }
            );
        });
        test("test command custom template", function(done) {
            let pathBin = __dirname + "/../bin/changelog-generator-twig.js";
            exec(
                pathBin +
                    " --owner testowner --repo test/repo --repoDir " +
                    __dirname +
                    " --template " +
                    __dirname +
                    "/../src/CHANGELOG.twig" +
                    " --baseCommit " +
                    "HEAD" +
                    "/../CHANGELOG.twig",
                (err, stdout) => {
                    if (err) {
                        done(err);
                    } else {
                        expect(stdout).to.contain(
                            "# Changelog\nAll notable changes to this project will be documented in this file.\n\nThe format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)\nand this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html)."
                        );
                        done();
                    }
                }
            );
        });
    });
};
