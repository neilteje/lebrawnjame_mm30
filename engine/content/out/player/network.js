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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const CONFIG = __importStar(require("../config"));
class NetworkPlayer extends _1.Player {
    constructor(team, server, log, disconnectStrikes = 0) {
        super(team);
        this.server = server;
        this.log = log;
        this.disconnectStrikes = disconnectStrikes;
    }
    send(request) {
        if (!this.server.connected()) {
            return;
        }
        return this.server.write(JSON.stringify(request));
    }
    parseReceived(read, schema) {
        return __awaiter(this, void 0, void 0, function* () {
            if (read === "") {
                return {
                    valid: false,
                    error: `timed out`,
                };
            }
            let data = undefined;
            try {
                data = JSON.parse(read);
            }
            catch (e) {
                return {
                    valid: false,
                    error: `sent invalid json (${e})`,
                };
            }
            const parseResult = schema.safeParse(data);
            if (!parseResult.success) {
                return {
                    valid: false,
                    error: `sent incorrectly formatted data (${parseResult.error.message})`,
                };
            }
            return {
                valid: true,
                data: parseResult.data,
            };
        });
    }
    receive(schema) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.server.connected()) {
                return;
            }
            const read = yield this.server.read();
            const result = yield this.parseReceived(read, schema);
            if (!result.valid) {
                this.disconnectStrikes += 1;
                this.log.logValidationError(this.team, `${result.error}, strike ${this.disconnectStrikes}/${CONFIG.DISCONNECT_STRIKES}`);
                if (this.disconnectStrikes >= CONFIG.DISCONNECT_STRIKES) {
                    yield this.finish(`Your bot failed to respond ${this.disconnectStrikes} times in a row (is your bot broken?) and was disconnected`);
                    this.log.logValidationError(this.team, `failed to respond ${this.disconnectStrikes} times in a row and was disconnected due to broken bot`);
                }
                return;
            }
            this.disconnectStrikes = 0;
            return result.data;
        });
    }
    sendHelloWorld(request) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.send({
                phase: _1.RequestPhase.HELLO_WORLD,
                data: request,
            });
            const result = yield this.receive(_1.HelloWorldResponseSchema);
            return result || { good: true };
        });
    }
    getPlanesSelected() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.send({
                phase: _1.RequestPhase.PLANE_SELECT,
                data: null,
            });
            const response = yield this.receive(_1.PlaneSelectResponseSchema);
            return response || new Map();
        });
    }
    getSteerInput(request) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.send({
                phase: _1.RequestPhase.STEER_INPUT,
                data: request,
            });
            const result = yield this.receive(_1.SteerInputResponseSchema);
            return result || new Map();
        });
    }
    finish(disconnectMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.send({
                phase: _1.RequestPhase.FINISH,
                data: disconnectMessage,
            });
            this.server.close();
        });
    }
}
exports.default = NetworkPlayer;
//# sourceMappingURL=network.js.map