var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
  development: {
    rootPath: rootPath,
    db: 'mongodb://localhost/meanTutorial',
    port: process.env.PORT || 3030
  },
  production: {
    rootPath: rootPath,
    db: 'mongodb://jcarlsten:password@ds043012.mongolab.com:43012/meantutorial',
    port: process.env.PORT || 80
  }
};
