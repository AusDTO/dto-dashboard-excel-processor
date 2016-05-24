// require('babel-register')({
//   ignore: false
// });

import test from 'ava';

// import 'babel-core/register';

import handler from '../validate/handler';

test.beforeEach(t => {
  t.context.event = {};
  t.context.context = {};
});


test('truth', t => {
  // handler(t.context.event, t.context.context)
  t.true(true);
});
