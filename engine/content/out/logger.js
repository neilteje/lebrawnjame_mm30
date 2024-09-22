"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const config_1 = require("./config");
class Logger {
    static setTurn(turn) {
        this.turn = turn;
        if (config_1.DEBUG) {
            console.log(`Start turn ${this.turn}`);
        }
    }
    static log(message) {
        console.log(`${message}`);
    }
    static error(message) {
        console.error(`[Turn ${this.turn}] ${message}`);
    }
}
exports.Logger = Logger;
Logger.turn = 0;
//# sourceMappingURL=logger.js.map