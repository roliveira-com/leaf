var copy = require('recursive-copy');
var path = require('path');

const basedir = path.resolve(__dirname, '../');

var options = {
    overwrite: true,
    expand: true,
};

copy(basedir+'/demos/', basedir+'/dist/demos', options)
    .then(function(results) {
        console.info(results.length + ' file(s) copied');
    })
    .catch(function(error) {
        console.error('Copy failed: ' + error);
    });


copy(basedir+'/demos/fonts', basedir+'/dist/fonts', options)
    .then(function(results) {
        console.info(results.length + ' file(s) copied');
    })
    .catch(function(error) {
        console.error('Copy failed: ' + error);
    });

