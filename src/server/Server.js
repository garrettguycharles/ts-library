"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.quickHandleRequest = exports.Server = void 0;
const express_1 = __importStar(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
require("express-async-errors");
const SecurityUtils_1 = require("../utils/SecurityUtils");
const Logger_1 = require("../logging/Logger");
const PrefixedError_1 = require("./net/error/abstract/PrefixedError");
class Server {
    app;
    router;
    constructor() {
        this.app = (0, express_1.default)();
        this.router = (0, express_1.Router)();
        this.app.all('*', function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            res.header('Access-Control-Allow-Headers', 'Content-Type');
            next();
        });
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, cookie_parser_1.default)());
        if (process.env.NODE_ENV === 'development') {
            this.app.use((0, morgan_1.default)('dev'));
        }
        if (process.env.NODE_ENV === 'production') {
            this.app.use((0, helmet_1.default)());
        }
        this.app.use('*', (req, res, next) => {
            const sessionid = req.cookies.sessionid;
            if (sessionid) {
                const auth = SecurityUtils_1.SecurityUtils.readSessionId(sessionid);
                req.body.user_id = auth.user_id || "";
                req.body.authtoken = auth.authtoken || "";
            }
            else {
                req.body.user_id = "";
                req.body.authtoken = "";
            }
            next();
        });
        this.app.use('/', this.router);
        this.app.use((err, req, res, next) => {
            new Logger_1.Logger().error(err);
            if (err instanceof PrefixedError_1.PrefixedError) {
                return res.status(err.getResponseCode()).json(err);
            }
            return res.status(400).json({
                error: err.message
            });
        });
    }
    use(path, router) {
        this.router.use(path, router);
    }
    get(path, handler) {
        this.router.get(path, handler);
        return this;
    }
    post(path, handler) {
        this.router.post(path, handler);
        return this;
    }
    start(port = process.env.PORT || 3000) {
        return this.app.listen(port, () => {
            new Logger_1.Logger().log("Server Start", `Listening on port ${port}`);
        });
    }
}
exports.Server = Server;
const quickHandleRequest = async function (req, res, handler) {
    const request = handler.constructRequest(req.body, req.params);
    const response = handler.handle(request);
    return res.status(200).send(response);
};
exports.quickHandleRequest = quickHandleRequest;
//# sourceMappingURL=Server.js.map