import test from 'ava';

import xlsx from 'xlsx';

import _ from 'lodash';

import WorkbookParser from '../../lib/WorkbookParser';


const data =  [ { Month: '2013-05',
    'Total accounts': '1',
    'New accounts': '11',
    'Sign ins': '21',
    'Sign ins per account': '31' },
  { Month: '2013-06',
    'Total accounts': '2',
    'New accounts': '12',
    'Sign ins': '22',
    'Sign ins per account': '31' },
  { Month: '2013-07',
    'Total accounts': '3',
    'New accounts': '13',
    'Sign ins': '23',
    'Sign ins per account': '33' },
  { Month: '2013-08',
    'Total accounts': '4',
    'New accounts': '14',
    'Sign ins': '24',
    'Sign ins per account': '34' },
  { Month: '2013-09',
    'Total accounts': '5',
    'New accounts': '15',
    'Sign ins': '25',
    'Sign ins per account': '35' },
    { Month: '2013-09',
      'BLAH': '5',
      'VTHA': '15'} ];

const workbook = {
  SheetNames: ['a']
}

test('maps excel data structure to dashboard format', t => {

  const parser = new WorkbookParser(workbook);
  const f = parser.sheet_to_json;

  parser.sheet_to_json = function() {
    return data;
  }

  const result = parser.parse();
  const keys = _.keys(result)

  t.true(_.includes(keys, 'Total accounts'));
  t.true(_.includes(keys, 'BLAH'));

  parser.sheet_to_json = f;
});
