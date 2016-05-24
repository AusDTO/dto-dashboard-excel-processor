'use strict';

class S3Event {

  constructor(event) {
    this.event = event;
  }

  get record() {
    return this.event.Records[0].s3
  }

  get url() {
    return `https://${this.record.bucket.name}/${this.record.object.key}`;
  }

}

module.exports = S3Event
