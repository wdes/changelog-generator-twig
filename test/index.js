'use strict';

process.env.TZ = 'UTC';
const changelog = require(__dirname + '/changelog');
const git = require(__dirname + '/git');
const command = require(__dirname + '/command');
suite('Changelog', function () {
    git();
    changelog();
    command();
});
