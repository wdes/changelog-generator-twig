'use strict';

const expect = require('chai').expect;
const git = require(__dirname + '/../src/git');

module.exports = function () {
    suite('git', function () {
        test('get last tag (dataset-1)', function (done) {
            expect(git.getLastTag('tag: v1.0.0')).to.equal('v1.0.0');
            done();
        });
        test('get last tag (dataset-2)', function (done) {
            expect(git.getLastTag('tag: v1.0.0, tag: RELEASE_2_0_0')).to.equal('v1.0.0');
            done();
        });
        test('get last tag (dataset-3)', function (done) {
            expect(git.getLastTag('tag: RELEASE_3_0_0, tag: RELEASE_2_0_0')).to.equal('RELEASE_3_0_0');
            done();
        });
        test('get last tag (dataset-4)', function (done) {
            expect(git.getLastTag('tag: RELEASES/RELEASE_3_0_0, tag: RELEASE_2_0_0')).to.equal(
                'RELEASES/RELEASE_3_0_0'
            );
            done();
        });
        test('get last tag (dataset-5)', function (done) {
            expect(git.getLastTag('tag: production/deploy/2020-02-19.1')).to.equal('production/deploy/2020-02-19.1');
            done();
        });
        test('changelog', function (done) {
            git.log(__dirname)
                .then((records) => {
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
