'use strict';

var request = require('request-promise');

var WorkbookParser = require('./WorkbookParser');

class WorkbookProcessor {

  constructor(url) {
    this.url = url;
  }

  process() {
    return request.get(this.url, {encoding: null})
            .then((buffer) => {
              const workbook = WorkbookParser.workbook(buffer)
              const parser = new WorkbookParser(workbook);
              return parser.parse();
            })
  }


}


module.exports = WorkbookProcessor;
