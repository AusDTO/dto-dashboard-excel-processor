import test from 'ava';

import sinon from 'sinon';

import _ from 'lodash';

import fs from 'fs';

import request from 'request-promise';

import { WorkbookProcessor } from '../../lib/WorkbookProcessor';


test.only('maps excel to correct format', async t => {
  const url = './data.xlsx';

  const req = Promise.resolve(fs.readFileSync(url));
  sinon.stub(request, 'get').returns(req);

  const processor = new WorkbookProcessor(url);
  const data = await processor.process()

  const keys = _.keys(data)
  t.true(_.includes(keys, 'Total accounts'));
});
