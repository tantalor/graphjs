try {
  var narwhal = require('narwhal');
} catch (ex) {}

var core = require('./core');
var extra = require('./extra');

if (narwhal)
{
  if (require.main === module)
  {
    var test = require('test');
    require("os").exit(test.run(core) || test.run(extra));
  }
}
