// require('babel-register')({
//   ignore: false
// });

import test from 'ava';

import _ from 'lodash';

import sinon from 'sinon';

import fs from 'fs';

import request from 'request-promise';

import handler from '../../IngestExcel/handler';

import event from '../lib/s3_event';

import WorkbookParser from '../../lib/WorkbookParser';

const context = {}

test.cb.serial('processes excel file', t => {
  const url = '../lib/data.xlsx';

  const req = Promise.resolve(fs.readFileSync(url));
  sinon.stub(request, 'get').returns(req);

  t.plan(1);

  handler.default(event, context, function(_, result) {
    t.is(result.url, 'https://sourcebucket/file.xls');
    t.end();
  })

  request.get.restore();
});

test.cb.serial('handles an HTTP error', t => {
  const url = '../lib/data.xlsx';

  const req = Promise.reject( new Error('Fail') );
  sinon.stub(request, 'get').returns(req);

  t.plan(1);

  handler.default(event, context, function(err, _) {
    t.is(err.message, 'Fail');
    t.end();
  })

  request.get.restore();
});

test.cb.only('handles a parser error', t => {
  const url = '../lib/data.xlsx';

  const req = Promise.resolve(fs.readFileSync(url));
  sinon.stub(request, 'get').returns(req);

  sinon.stub(WorkbookParser.prototype, 'parse').throws();

  t.plan(1);

  handler.default(event, context, function(err, result) {
    t.is(err.message, 'Error');
    t.end();
  })

  request.get.restore();
});
