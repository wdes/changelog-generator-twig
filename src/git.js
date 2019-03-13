'use strict';

/**
 * @see gist.github.com/sergey-shpak/40fe8d2534c5e5941b9db9e28132ca0b
 */
const { exec } = require('child_process');

// Compile 'git log' command
const command = (repoDir, params) =>
    `cd "${repoDir}" && git log --pretty=format:"
    ${params.join(command.format.param)}
    ${command.format.line}"`;

const hash = Math.random() * 10e8; // A random separator ?
command.format = {
    line: hash.toString(36),
    param: +hash.toString(36),
};

const log = (repoDir, schema, post = (k, v) => v) =>
    new Promise((resolve, reject) => {
        const keys = Object.keys(schema);
        const params = keys.map(key => schema[key]);
        // Execute coomand and parse result
        exec(command(repoDir, params), (err, stdout) => {
            if (err) {
                reject(err);
            } else {
                resolve(
                    stdout
                        .split(command.format.line)
                        .filter(line => line.length)
                        .map(line =>
                            line.split(command.format.param).reduce((obj, value, idx) => {
                                const key = keys[idx];
                                obj[key] = post(key, value);
                                return obj;
                            }, {})
                        )
                );
            }
        });
    });

const tagName = /tag\:\s*(v[\d|\.]*[-\.][\w]*)\,?/g;
const isTagName = str => {
    const match = tagName.exec(str);
    return match && match[1];
};

module.exports = {
    log: log,
    isTagName: isTagName,
};
