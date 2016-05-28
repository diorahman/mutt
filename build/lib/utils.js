var Reflect = require('reflect-r');var regeneratorRuntime = require('babel-regenerator-runtime');'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.download = exports.tmp = exports.execute = undefined;

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _tmp = require('tmp');

var _path = require('path');

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _child_process = require('child_process');

var _fs = require('fs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _bluebird2.default(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _bluebird2.default.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; } /* eslint-disable one-var */


var s3 = new _awsSdk2.default.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
    region: process.env.AWS_SQS_REGION || 'ap-southeast-1'
});

var execute = function execute(args) {
    var file = arguments.length <= 1 || arguments[1] === undefined ? 'mutt' : arguments[1];

    return new _bluebird2.default(function (resolve, reject) {
        args.unshift(file);
        (0, _child_process.exec)(args.join(' '), function (error, stdout, stderr) {
            if (error) {
                return reject(error);
            }
            return resolve({
                stdout: stdout,
                stderr: stderr
            });
        });
    });
};

var tmp = function tmp() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    return new _bluebird2.default(function (resolve, reject) {
        (0, _tmp.file)(options, function (error, path, fd, cleanup) {
            if (error) {
                return reject(error);
            }
            resolve({
                path: path,
                fd: fd,
                cleanup: cleanup
            });
        });
    });
};

var tmpFromPath = function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(path, extension) {
        var _parse, name, ext;

        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _parse = (0, _path.parse)(path);
                        name = _parse.name;
                        ext = _parse.ext;
                        return _context.abrupt('return', tmp({
                            keep: true,
                            prefix: name + '___',
                            postfix: extension || ext
                        }));

                    case 4:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function tmpFromPath(_x3, _x4) {
        return ref.apply(this, arguments);
    };
}();

var downloadFileFromLink = function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(link, destination) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        return _context2.abrupt('return', new _bluebird2.default(function (resolve, reject) {
                            var stream = (0, _fs.createWriteStream)(destination);
                            (0, _request2.default)(link).on('response', function (response) {
                                var statusCode = response.statusCode;

                                if (statusCode !== 200) {
                                    return reject(new Error(statusCode));
                                }
                            }).pipe(stream);
                            stream.on('finish', function () {
                                resolve(destination);
                            });
                            stream.on('error', reject);
                        }));

                    case 1:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function downloadFileFromLink(_x5, _x6) {
        return ref.apply(this, arguments);
    };
}();

var downloadFileFromS3 = function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(Key, Bucket, destination) {
        var link;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        link = s3.getSignedUrl('getObject', { Key: Key, Bucket: Bucket });
                        return _context3.abrupt('return', downloadFileFromLink(link, destination));

                    case 2:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function downloadFileFromS3(_x7, _x8, _x9) {
        return ref.apply(this, arguments);
    };
}();

var download = function () {
    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(_ref) {
        var link = _ref.link;
        var key = _ref.key;
        var bucket = _ref.bucket;
        var ext = _ref.ext;

        var _ref2, path, cleanup;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.next = 2;
                        return tmpFromPath(link || key, ext);

                    case 2:
                        _ref2 = _context4.sent;
                        path = _ref2.path;
                        cleanup = _ref2.cleanup;

                        if (!link) {
                            _context4.next = 10;
                            break;
                        }

                        _context4.next = 8;
                        return downloadFileFromLink(link, path);

                    case 8:
                        _context4.next = 16;
                        break;

                    case 10:
                        if (!(key && bucket)) {
                            _context4.next = 15;
                            break;
                        }

                        _context4.next = 13;
                        return downloadFileFromS3(key, bucket, path);

                    case 13:
                        _context4.next = 16;
                        break;

                    case 15:
                        return _context4.abrupt('return', null);

                    case 16:
                        return _context4.abrupt('return', { path: path, cleanup: cleanup });

                    case 17:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    }));

    return function download(_x10) {
        return ref.apply(this, arguments);
    };
}();

exports.execute = execute;
exports.tmp = tmp;
exports.download = download;
//# sourceMappingURL=utils.js.map
