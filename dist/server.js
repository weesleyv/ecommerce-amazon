"use strict";

var _express = _interopRequireDefault(require("express"));

var _data = _interopRequireDefault(require("./data"));

var _config = _interopRequireDefault(require("./config"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _userRoute = _interopRequireDefault(require("./routes/userRoute"));

var _productRoute = _interopRequireDefault(require("./routes/productRoute"));

var _orderRoute = _interopRequireDefault(require("./routes/orderRoute"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var mongodbUrl = _config["default"].MONGODB_URL;

_mongoose["default"].connect(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})["catch"](function (error) {
  return console.log(error.reason);
});

var app = (0, _express["default"])();
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use(_bodyParser["default"].json());
app.use("/api/users", _userRoute["default"]);
app.use("/api/products", _productRoute["default"]);
app.use("/api/orders", _orderRoute["default"]);
app.get("/api/config/paypal", function (req, res) {
  res.send(_config["default"].PAYPAL_CLIENT_ID);
});
app.get("/api/products", function (req, res) {
  res.send(_data["default"].products);
});
app.listen(process.env.PORT || 5000, function () {
  console.log("Server running on", process.env.PORT || 5000);
});