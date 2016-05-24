'use strict';

var xlsx = require('xlsx');

var _ = require('lodash');

class WorkbookParser {

  constructor(workbook) {
    this.workbook = workbook;
  }

  sheet_to_json(name) {
    return xlsx.utils.sheet_to_json(this.workbook.Sheets[name])
  }

  parse() {
    const data = {};

    _.each(this.workbook.SheetNames, (name) => {
      const worksheet = this.sheet_to_json(name);

      _.each(worksheet, (row) => {
        let label = row.Month;
        _.forIn(row, (v, k) => {
          if(k != 'Month') {
            (data[k] = data[k] || []).push({ label: label, value: v });
          }
        });
      });
    });
    return data;
  }

  static workbook(buffer) {
    return xlsx.read(buffer, {type:"buffer"});
  }
}


module.exports = WorkbookParser
