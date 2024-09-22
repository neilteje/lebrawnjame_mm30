"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const net_1 = __importDefault(require("net"));
const config_1 = require("../config");
class SocketServer {
    constructor() {
        this.buffer = "";
    }
    connect(port) {
        return __awaiter(this, void 0, void 0, function* () {
            this.server = yield new Promise((res) => {
                let timeout = undefined;
                const server = net_1.default.createServer((socket) => {
                    this.socket = socket;
                    clearTimeout(timeout);
                    res(server);
                });
                server.listen(port);
                timeout = setTimeout(() => {
                    server.close();
                    res(undefined);
                }, config_1.INITIAL_RESPONSE_TIMEOUT);
            });
        });
    }
    connected() {
        return !!this.socket;
    }
    write(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.connected()) {
                throw new Error("Cannot write to closed socket");
            }
            return new Promise((resolve) => {
                const timeout = setTimeout(() => {
                    resolve();
                }, config_1.RESPONSE_TIMEOUT);
                this.socket.write(`${data}\n`, () => {
                    clearTimeout(timeout);
                    resolve();
                });
            });
        });
    }
    read() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.connected()) {
                throw new Error("Cannot read from closed socket");
            }
            return new Promise((resolve) => {
                const handler = (data) => {
                    this.buffer += data.toString();
                    if (this.buffer.includes("\n")) {
                        clearTimeout(timeout);
                        const message = this.buffer.trim();
                        this.buffer = "";
                        this.socket.removeListener("data", handler);
                        resolve(message);
                    }
                };
                const timeout = setTimeout(() => {
                    this.socket.removeListener("data", handler);
                    resolve("");
                }, config_1.RESPONSE_TIMEOUT);
                this.socket.on("data", handler);
            });
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.server) {
                this.server.removeAllListeners();
                this.server.close();
            }
            if (this.socket) {
                this.socket.removeAllListeners();
                this.socket.destroy();
            }
            this.server = undefined;
            this.socket = undefined;
        });
    }
}
exports.default = SocketServer;
//# sourceMappingURL=socket-server.js.map