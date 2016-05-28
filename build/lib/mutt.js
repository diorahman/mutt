var Reflect = require('reflect-r');var regeneratorRuntime = require('babel-regenerator-runtime');'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable one-var */
/** @module Mutt*/


var _utils = require('./utils');

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _fs = require('fs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _bluebird2.default(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _bluebird2.default.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var writeFileAsync = _bluebird2.default.promisify(_fs.writeFile);

/** Class representing Mutt */

var Mutt = function () {
    /**
     * Constructs Mutt
     *
     * @param {String} name - The name.
     */

    function Mutt() {
        var _ref = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

        var from = _ref.from;
        var _ref$to = _ref.to;
        var to = _ref$to === undefined ? [] : _ref$to;
        var _ref$cc = _ref.cc;
        var cc = _ref$cc === undefined ? [] : _ref$cc;
        var _ref$bcc = _ref.bcc;
        var bcc = _ref$bcc === undefined ? [] : _ref$bcc;
        var _ref$subject = _ref.subject;
        var subject = _ref$subject === undefined ? '' : _ref$subject;
        var _ref$content = _ref.content;
        var content = _ref$content === undefined ? '' : _ref$content;
        var _ref$contentType = _ref.contentType;
        var contentType = _ref$contentType === undefined ? 'text/plain' : _ref$contentType;
        var _ref$attachments = _ref.attachments;
        var attachments = _ref$attachments === undefined ? [] : _ref$attachments;

        _classCallCheck(this, Mutt);

        // FIXME: validation
        this.from = from;
        this.to = Array.isArray(to) ? to : [to];
        this.cc = cc;
        this.bcc = bcc;
        this.subject = subject;
        this.content = content;
        this.contentType = contentType;
        this.attachments = Array.isArray(attachments) ? attachments : [attachments];
    }

    /**
     * Sends the email.
     *
     */


    _createClass(Mutt, [{
        key: 'send',
        value: function () {
            var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                var keep = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

                var args, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, to, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, cc, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, bcc, downloaded, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, file, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, attachment, tmpFile, path, result, _iteratorNormalCompletion6, _didIteratorError6, _iteratorError6, _iterator6, _step6, cleanup;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                args = [];

                                if (this.from) {
                                    args.push('-e');
                                    args.push('"my_hdr From: ' + this.from + '"');
                                }

                                args.push('-e');
                                args.push('"set content_type=' + this.contentType + '"');

                                args.push('-s');
                                args.push('"' + this.subject + '"');

                                _iteratorNormalCompletion = true;
                                _didIteratorError = false;
                                _iteratorError = undefined;
                                _context.prev = 9;
                                for (_iterator = this.to[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                    to = _step.value;

                                    args.push(to);
                                }

                                _context.next = 17;
                                break;

                            case 13:
                                _context.prev = 13;
                                _context.t0 = _context['catch'](9);
                                _didIteratorError = true;
                                _iteratorError = _context.t0;

                            case 17:
                                _context.prev = 17;
                                _context.prev = 18;

                                if (!_iteratorNormalCompletion && _iterator.return) {
                                    _iterator.return();
                                }

                            case 20:
                                _context.prev = 20;

                                if (!_didIteratorError) {
                                    _context.next = 23;
                                    break;
                                }

                                throw _iteratorError;

                            case 23:
                                return _context.finish(20);

                            case 24:
                                return _context.finish(17);

                            case 25:
                                _iteratorNormalCompletion2 = true;
                                _didIteratorError2 = false;
                                _iteratorError2 = undefined;
                                _context.prev = 28;
                                for (_iterator2 = this.cc[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                    cc = _step2.value;

                                    args.push('-c');
                                    args.push(cc);
                                }

                                _context.next = 36;
                                break;

                            case 32:
                                _context.prev = 32;
                                _context.t1 = _context['catch'](28);
                                _didIteratorError2 = true;
                                _iteratorError2 = _context.t1;

                            case 36:
                                _context.prev = 36;
                                _context.prev = 37;

                                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                    _iterator2.return();
                                }

                            case 39:
                                _context.prev = 39;

                                if (!_didIteratorError2) {
                                    _context.next = 42;
                                    break;
                                }

                                throw _iteratorError2;

                            case 42:
                                return _context.finish(39);

                            case 43:
                                return _context.finish(36);

                            case 44:
                                _iteratorNormalCompletion3 = true;
                                _didIteratorError3 = false;
                                _iteratorError3 = undefined;
                                _context.prev = 47;
                                for (_iterator3 = this.bcc[Symbol.iterator](); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                    bcc = _step3.value;

                                    args.push('-b');
                                    args.push(bcc);
                                }

                                _context.next = 55;
                                break;

                            case 51:
                                _context.prev = 51;
                                _context.t2 = _context['catch'](47);
                                _didIteratorError3 = true;
                                _iteratorError3 = _context.t2;

                            case 55:
                                _context.prev = 55;
                                _context.prev = 56;

                                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                    _iterator3.return();
                                }

                            case 58:
                                _context.prev = 58;

                                if (!_didIteratorError3) {
                                    _context.next = 61;
                                    break;
                                }

                                throw _iteratorError3;

                            case 61:
                                return _context.finish(58);

                            case 62:
                                return _context.finish(55);

                            case 63:
                                if (!(this.attachments.length > 0)) {
                                    _context.next = 109;
                                    break;
                                }

                                args.push('-a');

                                _context.next = 67;
                                return _bluebird2.default.map(this.attachments, function (attachment) {
                                    return (0, _utils.download)(attachment);
                                });

                            case 67:
                                downloaded = _context.sent;


                                this.attachments = [];
                                this.cleanups = [];
                                _iteratorNormalCompletion4 = true;
                                _didIteratorError4 = false;
                                _iteratorError4 = undefined;
                                _context.prev = 73;
                                for (_iterator4 = downloaded[Symbol.iterator](); !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                                    file = _step4.value;

                                    this.attachments.push(file.path);
                                    this.cleanups.push(file.cleanup);
                                }

                                _context.next = 81;
                                break;

                            case 77:
                                _context.prev = 77;
                                _context.t3 = _context['catch'](73);
                                _didIteratorError4 = true;
                                _iteratorError4 = _context.t3;

                            case 81:
                                _context.prev = 81;
                                _context.prev = 82;

                                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                                    _iterator4.return();
                                }

                            case 84:
                                _context.prev = 84;

                                if (!_didIteratorError4) {
                                    _context.next = 87;
                                    break;
                                }

                                throw _iteratorError4;

                            case 87:
                                return _context.finish(84);

                            case 88:
                                return _context.finish(81);

                            case 89:
                                _iteratorNormalCompletion5 = true;
                                _didIteratorError5 = false;
                                _iteratorError5 = undefined;
                                _context.prev = 92;
                                for (_iterator5 = this.attachments[Symbol.iterator](); !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                                    attachment = _step5.value;

                                    args.push(attachment);
                                }

                                _context.next = 100;
                                break;

                            case 96:
                                _context.prev = 96;
                                _context.t4 = _context['catch'](92);
                                _didIteratorError5 = true;
                                _iteratorError5 = _context.t4;

                            case 100:
                                _context.prev = 100;
                                _context.prev = 101;

                                if (!_iteratorNormalCompletion5 && _iterator5.return) {
                                    _iterator5.return();
                                }

                            case 103:
                                _context.prev = 103;

                                if (!_didIteratorError5) {
                                    _context.next = 106;
                                    break;
                                }

                                throw _iteratorError5;

                            case 106:
                                return _context.finish(103);

                            case 107:
                                return _context.finish(100);

                            case 108:
                                args.push('--');

                            case 109:
                                _context.next = 111;
                                return (0, _utils.tmp)({ keep: keep });

                            case 111:
                                tmpFile = _context.sent;
                                path = tmpFile.path;
                                _context.next = 115;
                                return writeFileAsync(path, this.content);

                            case 115:
                                args.push('<');
                                args.push(path);
                                _context.next = 119;
                                return (0, _utils.execute)(args);

                            case 119:
                                result = _context.sent;

                                if (keep) {
                                    _context.next = 140;
                                    break;
                                }

                                _iteratorNormalCompletion6 = true;
                                _didIteratorError6 = false;
                                _iteratorError6 = undefined;
                                _context.prev = 124;

                                for (_iterator6 = this.cleanups[Symbol.iterator](); !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                                    cleanup = _step6.value;

                                    cleanup();
                                }
                                _context.next = 132;
                                break;

                            case 128:
                                _context.prev = 128;
                                _context.t5 = _context['catch'](124);
                                _didIteratorError6 = true;
                                _iteratorError6 = _context.t5;

                            case 132:
                                _context.prev = 132;
                                _context.prev = 133;

                                if (!_iteratorNormalCompletion6 && _iterator6.return) {
                                    _iterator6.return();
                                }

                            case 135:
                                _context.prev = 135;

                                if (!_didIteratorError6) {
                                    _context.next = 138;
                                    break;
                                }

                                throw _iteratorError6;

                            case 138:
                                return _context.finish(135);

                            case 139:
                                return _context.finish(132);

                            case 140:

                                result.args = args;
                                return _context.abrupt('return', result);

                            case 142:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[9, 13, 17, 25], [18,, 20, 24], [28, 32, 36, 44], [37,, 39, 43], [47, 51, 55, 63], [56,, 58, 62], [73, 77, 81, 89], [82,, 84, 88], [92, 96, 100, 108], [101,, 103, 107], [124, 128, 132, 140], [133,, 135, 139]]);
            }));

            function send(_x2) {
                return ref.apply(this, arguments);
            }

            return send;
        }()
    }]);

    return Mutt;
}();

exports.default = Mutt;
//# sourceMappingURL=mutt.js.map
