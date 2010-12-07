#!/usr/bin/env node

(
  typeof(require) !== 'undefined' ? 
    require('../test-harness') :
    load('test-harness.js')
)
  .run('./test/core')
  .run('./test/extra');
