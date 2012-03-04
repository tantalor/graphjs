#!/usr/bin/env node

var path = require('path');
var tests = [
  path.resolve('test/core'),
  path.resolve('test/extra')
];

if( typeof(require) !== 'undefined') {
  require('steel')
    .suite(tests)
} else {
  load('steel.js')
    .add('./test/core')
    .add('./test/extra');
}
