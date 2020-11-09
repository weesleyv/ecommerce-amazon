"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAuth = exports.isAdmin = exports.getToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getToken = function getToken(user) {
  return _jsonwebtoken["default"].sign(user.toJSON(), _config["default"].JWT_SECRET, {
    expiresIn: "48h"
  });
};

exports.getToken = getToken;

var isAuth = function isAuth(req, res, next) {
  var token = req.headers.authorization;
  console.log(req.headers);

  if (token) {
    var onlyToken = token.slice(7, token.length);

    _jsonwebtoken["default"].verify(onlyToken, _config["default"].JWT_SECRET, function (err, decode) {
      if (err) {
        return res.status(401).send({
          message: "invalid token"
        });
      }

      req.user = decode;
      next();
      return;
    });
  } else {
    return res.status(401).send({
      message: "token is not supplied"
    });
  }
};

exports.isAuth = isAuth;

var isAdmin = function isAdmin(req, res, next) {
  if (req.user && req.user.isAdmin) {
    return next();
  }

  res.status(401).send({
    messgae: "Not Admin"
  });
};

exports.isAdmin = isAdmin;