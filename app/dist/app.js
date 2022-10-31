"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var https_1 = __importDefault(require("https"));
var pg_1 = require("pg");
var dotenv_1 = __importDefault(require("dotenv"));
var index_1 = require("./routes/index");
var data_1 = require("./routes/data");
dotenv_1["default"].config();
var app = (0, express_1["default"])();
app.use(express_1["default"].static(path_1["default"].join(__dirname, "..", "build")));
app.use(express_1["default"].static("public"));
var externalUrl = process.env.RENDER_EXTERNAL_URL;
var port = externalUrl && process.env.PORT ? parseInt(process.env.PORT) : 4080;
if (externalUrl) {
    var hostname_1 = '127.0.0.1';
    app.listen(port, hostname_1, function () {
        console.log("Server locally running at http://".concat(hostname_1, ":").concat(port, "/ and from\n  outside on ").concat(externalUrl));
    });
}
else {
    https_1["default"].createServer({
        key: fs_1["default"].readFileSync('server.key'),
        cert: fs_1["default"].readFileSync('server.cert')
    }, app)
        .listen(port, function () {
        console.log("Server running at https://localhost:".concat(port, "/"));
    });
}
app.use(express_1["default"].json());
app.use(express_1["default"].urlencoded({ extended: true }));
app.use(express_1["default"].static(__dirname));
// database on Render
var pool = new pg_1.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: 'hnlwomen_40ha',
    password: process.env.DB_PASSWORD,
    port: 5432,
    ssl: true
});
app.use('/', index_1.indexRouter);
app.use('/data', data_1.dataRouter);
exports["default"] = { app: app };
