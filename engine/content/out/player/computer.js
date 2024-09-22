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
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const data_1 = require("../plane/data");
class ComputerPlayer extends _1.Player {
    constructor() {
        super(...arguments);
        this.counter = 0;
        this.steers = new Map();
    }
    sendHelloWorld(_) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                good: true,
            };
        });
    }
    getPlanesSelected() {
        return __awaiter(this, void 0, void 0, function* () {
            // Ask for a random number of basic planes
            const selectedPlanes = new Map([
                [data_1.PlaneType.STANDARD, Math.floor(3 + Math.random() * 2)],
            ]);
            return selectedPlanes;
        });
    }
    getSteerInput(request) {
        return __awaiter(this, void 0, void 0, function* () {
            this.counter += 1;
            if (this.counter === 1) {
                const peak = Math.max(...Object.values(request).map((plane) => Math.abs(plane.position.x)));
                for (const [id, plane] of Object.entries(request)) {
                    this.steers.set(id, (plane.position.x / peak) *
                        0.5 *
                        Math.sign(plane.position.y));
                }
            }
            if (this.counter < 5 || (this.counter >= 10 && this.counter <= 12)) {
                return new Map();
            }
            if (this.counter === 13) {
                for (const id of this.steers.keys()) {
                    this.steers.set(id, this.steers.get(id) > 0 ? -1 : 1);
                }
            }
            return this.steers;
        });
    }
    finish(_disconnectMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            // Do nothing
        });
    }
}
exports.default = ComputerPlayer;
//# sourceMappingURL=computer.js.map