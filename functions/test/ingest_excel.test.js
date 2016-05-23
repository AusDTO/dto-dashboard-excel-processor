// require('babel-register')({
//   ignore: false
// });

import test from 'ava';

import request from 'request-promise';

import xlsx from 'xlsx';

import _ from 'lodash';

import 'babel-core/register';

test.beforeEach(t => {
  t.context.event = {};
  t.context.context = {};
});


test.cb('truth', t => {

  // const url = './data.xlsx';
  // const workbook = xlsx.readFile(url);
  const url = 'http://s3-us-west-2.amazonaws.com/blahvtha.xyz/data/data.xlsx';

  request(url, {encoding: null})
    .then(function (s) {
      // console.log(s);
      const workbook = xlsx.read(s, {type:"buffer"});
      const worksheets = workbook.SheetNames;

      const data = [];

      worksheets.forEach(function(y) {
        const worksheet = xlsx.utils.sheet_to_json(workbook.Sheets[y]);
        // console.log(worksheet);
        let widget = {};

        _.each(worksheet, (row) => {
          let label = row.Month;
          _.forIn(row, (v, k) => {
            if(k != 'Month') {
              (widget[k] = widget[k] || []).push({ label: label, value: v });
            }
          });
        });
        data.push(widget)
      });

      console.log(data);
      t.pass();
      t.end();
    })
    .catch(function (err) {
      console.log(err);
      t.fail();
      t.end();
    });


});
