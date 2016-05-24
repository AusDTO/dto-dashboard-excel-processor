'use strict';

var S3Event = require('../lib/S3Event');
var WorkbookProcessor = require('../lib/WorkbookProcessor');

module.exports.default = (event, context, callback) => {
  const s3Event = new S3Event(event);

  console.log({Processing: s3Event.url});

  const workbook = new WorkbookProcessor(s3Event.url);

  workbook.process()
    .then( (data) => {
      callback(null, { url: s3Event.url, data: data });
    })
    .catch( (err) => {
      console.log({Error: err.message});
      console.log(err);
      callback(err, null);
    });
}
