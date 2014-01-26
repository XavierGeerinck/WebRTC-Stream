var defaultEnvironment = 'dev';
var allowedEnvironments = [ 'dev', 'stag', 'prod' ];

var config;

if (allowedEnvironments.indexOf(process.argv[2]) == -1) {
    config = require(process.cwd() + '/config/app_dev');
} else {
    config = require(process.cwd() + '/config/app_' + (process.argv[2] || 'dev'));
}

module.exports = config;