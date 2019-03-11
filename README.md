# An index of the MariaDB and MySQL Knowledge bases

[![Build Status](https://travis-ci.com/wdes/changelog.svg?branch=master)](https://travis-ci.com/wdes/changelog)
[![codecov](https://codecov.io/gh/wdes/changelog/branch/master/graph/badge.svg)](https://codecov.io/gh/wdes/changelog)
[![npm version](https://badge.fury.io/js/changelog.svg)](https://badge.fury.io/js/changelog)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/wdes/changelog.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/wdes/changelog/alerts/)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/wdes/changelog.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/wdes/changelog/context:javascript)
[![Known Vulnerabilities](https://snyk.io/test/github/wdes/changelog/badge.svg)](https://snyk.io/test/github/wdes/changelog)
[![Dependabot](https://badgen.net/badge/Dependabot/enabled/green?icon=dependabot)](https://dependabot.com/)


## Generate a changelog

### Commands

#### Help

`
changelog-generator-twig --help
`

```
Usage: changelog-generator-twig [options]

A changelog generator using twig templates

Options:
      --owner <owner>              The repo owner
      --repo <repo>                The repo
      --repoDir <repoDir>          The repo dir
      --headName <headName>        The head name (default: Unreleased)
      --baseCommit <commmitHash>   The base commit hash
      --template <templatePath>    The twig template path (default: /mnt/Dev/@wdes/test/node_modules/changelog-generator-twig/src/CHANGELOG.twig)
      --version                    display version information and exit
      --help                       display this help and exit

```

#### Basic example

`
./node_modules/.bin/changelog-generator-twig --owner wdes --repo changelog --repoDir ./ --baseCommit c295e8c3244b857b9d22fdd83a80d2f31cc6139b
`

Or

`
changelog-generator-twig --owner williamdes --repo mariadb-mysql-kbs --repoDir /mnt/Dev/@williamdes/mariadb-mysql-kbs/ --baseCommit 4282724e1e04d6b27d3c0744e1a37a50be740237
`

See changelog example here: https://github.com/williamdes/mariadb-mysql-kbs/blob/ef766fd9991e4fd1e80bb7b14abb2a352ecd4689/CHANGELOG.md

#### Use a custom template (twig)

`
changelog-generator-twig --owner williamdes --repo mariadb-mysql-kbs --repoDir /mnt/Dev/@williamdes/mariadb-mysql-kbs/ --baseCommit 4282724e1e04d6b27d3c0744e1a37a50be740237 --template ./CHANGELOG_template.twig
`

##### Data passed to twig template

```
args: [ additional args passed to script ],
links: [
    {
        name: "v1.0.0",
        start: "185050ec502f20b3280df46485605e99563d1e87",
        end: "HEAD"
    },...
],
versions: [
    {
        name: "v1.0.0",
        changesAdded: [
            {
                hash: "d2c9361",
                longHash:
                    "d2c9361467b0e67e4c7a1bbfa092b342363450cc",
                msg: "Added some files"
            }
        ],
        changesChanged: [],
        changesDeprecated: [],
        changesRemoved: [],
        changesFixed: [],
        changesSecurity: [],
        changesImprove: []
    },...
],
owner: "--owner argument",
repo: "--repo argument"
```

### Install

```
npm install --save changelog-generator-twig
```

