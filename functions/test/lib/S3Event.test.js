import test from 'ava';

import xlsx from 'xlsx';

import _ from 'lodash';

import S3Event from '../../lib/S3Event';

import event from './s3_event';

test('maps excel to correct format', t => {
  const s3Event = new S3Event(event);
  t.is(s3Event.url, 'https://sourcebucket/file.xls');
});
