'use strict';

const expect = require('chai').expect;
const git = require(__dirname + '/../src/git');

module.exports = function() {
    suite('git', function() {
        test('is tag name', function(done) {
            expect(git.isTagName('tag:v1.0.0')).to.equal('v1.0.0');
            done();
        });
        test('changelog', function(done) {
            git.log(
                __dirname,
                {
                    tag: '%d',
                    note: '%N',
                    msg: '%s',
                    hash: '%h',
                    longHash: '%H',
                    author: '%ae',
                    signature: '%G?',
                    time: '%at',
                },
                // replace \r\n etc from value
                (key, value) => value.replace(/\s\s/g, '')
            )
                .then(records => {
                    expect(records[0]).to.have.property('author'); //williamdes@wdes.fr
                    expect(records[0]).to.have.property('hash'); //3cb4dd9
                    expect(records[0]).to.have.property('longHash'); //3cb4dd9444649a47df6975cd8a2c6d1754295507
                    expect(records[0]).to.have.property('msg'); //__INIT__
                    expect(records[0]).to.have.property('note'); //
                    expect(records[0]).to.have.property('signature'); //N
                    expect(records[0]).to.have.property('tag'); //(HEAD -> master)
                    expect(records[0]).to.have.property('time'); //1551782493
                    expect(records[0].time.trim()).to.match(/[0-9]{10}/);
                    done();
                })
                .catch(done);
        });
    });
};
