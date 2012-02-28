#!/usr/bin/env node

if( typeof(require) !== 'undefined') {
  require('../steel')
    .suite([
      '../../../test/core',
      '../../../test/extra'
    ])
} else {
  load('steel.js')
    .add('./test/core')
    .add('./test/extra');
}
