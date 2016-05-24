'use strict';

var S3Event = require('../lib/S3Event');

module.exports.default = (event, context, callback) => {
  callback(null, 'helo!');
};
