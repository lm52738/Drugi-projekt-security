"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.dataRouter = void 0;
var express_1 = __importDefault(require("express"));
exports.dataRouter = express_1["default"].Router();
exports.dataRouter.post('/good', function (req, res) {
});
exports.dataRouter.post('/bad', function (req, res) {
});
