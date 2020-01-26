#! /usr/bin/env node
const cli = require('snack-cli');
const packageJson = require(__dirname + '/../package.json');
const path = require('path');
const defaultTemplate = path.resolve(__dirname, '..', 'src', 'CHANGELOG.twig');

var argv = cli
    .name(packageJson.name)
    .version(packageJson.version)
    .usage('[options]')
    .description(packageJson.description)
    .option('    --owner <owner>', 'The repo owner')
    .option('    --repo <repo>', 'The repo')
    .option('    --repoDir <repoDir>', 'The repo dir')
    .option('    --lastTagName <lastTagName>', 'The last tag name', 'HEAD')
    .option('    --headName <headName>', 'The head name', 'Unreleased')
    .option(
        '    --convention <conventionName>',
        'The convention name (williamdes, conventional, conventional+legacy, allchanges)',
        'conventional'
    )
    .option('    --baseCommit <commmitHash>', 'The base commit hash')
    .option('    --template <templatePath>', 'The twig template path', defaultTemplate)
    .allowArgumentCount(3)
    .parse();

require(__dirname + '/../src/index')(
    argv.args,
    argv.repoDir,
    argv.owner,
    argv.repo,
    argv.headName,
    argv.baseCommit,
    argv.template,
    argv.convention,
    argv.lastTagName
);
