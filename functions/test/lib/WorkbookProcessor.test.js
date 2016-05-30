import test from 'ava';

import sinon from 'sinon';

import _ from 'lodash';

import fs from 'fs';

import request from 'request-promise';

import WorkbookParser from '../../lib/WorkbookParser';
import WorkbookProcessor from '../../lib/WorkbookProcessor';

test.serial('processes excel binary to json', async t => {
  const url = './data.xlsx';

  const req = Promise.resolve(fs.readFileSync(url));
  sinon.stub(request, 'get').returns(req);

  const processor = new WorkbookProcessor(url);
  const data = await processor.process()

  const keys = _.keys(data)
  t.true(_.includes(keys, 'Total accounts'));
  t.true(_.includes(keys, 'BLAH'));

  request.get.restore();
});

test.serial('processes an HTTP error', async t => {

  const req = Promise.reject( new Error('Fail') );
  sinon.stub(request, 'get').returns(req);

  const processor = new WorkbookProcessor('');

  try {
    await processor.process()
    t.fail();
  } catch(err) {
    t.is(err.message, 'Fail');
  };

  request.get.restore();
});


test.serial('processes a parser error', async t => {
  const url = './data.xlsx';

  const req = Promise.resolve(fs.readFileSync(url));
  sinon.stub(request, 'get').returns(req);

  sinon.stub(WorkbookParser.prototype, 'parse').throws();

  const processor = new WorkbookProcessor(url);

  try {
    await processor.process()
    t.fail();
  } catch(err) {
    t.is(err.message, 'Error');
  };

  request.get.restore();
});
