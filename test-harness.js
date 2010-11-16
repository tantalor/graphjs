if (typeof(require) !== 'undefined') {
  // common
  
  try {
    var narwhal = require('narwhal');
  } catch (e) {}
    
  exports.run = function (filename) {
    if (narwhal) {
      require('test').run(require(filename));
    }
  }
} else if (typeof(load) !== 'undefined') {
  // jsc
}
