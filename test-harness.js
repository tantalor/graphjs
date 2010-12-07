if (typeof(require) !== 'undefined') {
  // common
  
  try {
    var narwhal = require('narwhal');
  } catch (e) {}
  
  exports.run = function (filename) {
    if (narwhal) {
      require('test').run(require(filename));
    } else {
      require(filename);
    }
    return exports;
  }
} else if (typeof(load) !== 'undefined') {
  // jsc
  (function () {
    var exports = {};
    
    exports.run = function (filename) {
      if (!filename.match("\.js$")) filename += ".js";
      load(filename);
      return exports;
    };
      
    return exports;
  })();
}
