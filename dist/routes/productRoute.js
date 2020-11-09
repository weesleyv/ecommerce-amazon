"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _Product = _interopRequireDefault(require("../models/Product"));

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = _express["default"].Router();

router.get("/", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var searchWord, products;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(req.query.searchKeyWords, "Query");
            searchWord = req.query.searchKeyWords ? {
              name: {
                $regex: req.query.searchKeyWords,
                $options: 'i'
              }
            } : {};
            _context.next = 4;
            return _Product["default"].find(_objectSpread({}, searchWord));

          case 4:
            products = _context.sent;
            console.log(products, "Products");
            res.send(products);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.get("/:id", /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var product;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _Product["default"].findOne({
              _id: req.params.id
            });

          case 2:
            product = _context2.sent;

            if (product) {
              res.send(product);
            } else {
              res.status(404).send({
                message: "Product Not Found"
              });
            }

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
router.post("/", _utils.isAuth, _utils.isAdmin, /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var product, newProduct;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            product = new _Product["default"]({
              name: req.body.name,
              price: req.body.price,
              image: req.body.image,
              description: req.body.description,
              brand: req.body.brand,
              category: req.body.category,
              rating: req.body.rating,
              reviews: req.body.reviews
            });
            _context3.next = 3;
            return product.save();

          case 3:
            newProduct = _context3.sent;

            if (!newProduct) {
              _context3.next = 8;
              break;
            }

            return _context3.abrupt("return", res.status(201).send({
              messgae: "Product created",
              data: newProduct
            }));

          case 8:
            return _context3.abrupt("return", res.status(500).send({
              messgae: "Error in creating product"
            }));

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
router.put("/:id", _utils.isAuth, _utils.isAdmin, /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var productId, product, updatedProduct;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            productId = req.params.id;
            _context4.next = 3;
            return _Product["default"].findOne({
              _id: productId
            });

          case 3:
            product = _context4.sent;

            if (!product) {
              _context4.next = 17;
              break;
            }

            product.name = req.body.name;
            product.price = req.body.price;
            product.image = req.body.image;
            product.brand = req.body.brand;
            product.category = req.body.category;
            product.countInStock = req.body.countInStock;
            product.description = req.body.description;
            _context4.next = 14;
            return product.save();

          case 14:
            updatedProduct = _context4.sent;

            if (!updatedProduct) {
              _context4.next = 17;
              break;
            }

            return _context4.abrupt("return", res.status(200).send({
              message: "Product Updated",
              data: product
            }));

          case 17:
            return _context4.abrupt("return", res.status(500).send({
              message: "Error in Updating product"
            }));

          case 18:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
router["delete"]("/:id", _utils.isAuth, _utils.isAdmin, /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var productId;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            productId = req.params.id;
            _context5.next = 4;
            return _Product["default"].deleteOne({
              _id: productId
            });

          case 4:
            res.send({
              message: "Product Deleted"
            });
            _context5.next = 10;
            break;

          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5["catch"](0);
            res.send({
              message: _context5.t0.message
            });

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 7]]);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;