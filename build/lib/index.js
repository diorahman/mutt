var Reflect = require('reflect-r');var regeneratorRuntime = require('babel-regenerator-runtime');'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MuttError = undefined;

var _sourceMapSupport = require('source-map-support');

var _mutt = require('./mutt');

var _mutt2 = _interopRequireDefault(_mutt);

var _error = require('./error.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _sourceMapSupport.install)(); /** @module Index */


// Exposes main entrypoint to the lib.
exports.default = _mutt2.default;

// Exposes the lib error.

exports.MuttError = _error.MuttError;
//# sourceMappingURL=index.js.map
