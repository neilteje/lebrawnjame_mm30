"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Direction = exports.Vector = void 0;
class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add(other) {
        this.x += other.x;
        this.y += other.y;
    }
    magnitude() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }
}
exports.Vector = Vector;
var Direction;
(function (Direction) {
    Direction[Direction["EAST"] = 0] = "EAST";
    Direction[Direction["NORTHEAST"] = 45] = "NORTHEAST";
    Direction[Direction["NORTH"] = 90] = "NORTH";
    Direction[Direction["NORTHWEST"] = 135] = "NORTHWEST";
    Direction[Direction["WEST"] = 180] = "WEST";
    Direction[Direction["SOUTHWEST"] = 225] = "SOUTHWEST";
    Direction[Direction["SOUTH"] = 270] = "SOUTH";
    Direction[Direction["SOUTHEAST"] = 315] = "SOUTHEAST";
})(Direction || (exports.Direction = Direction = {}));
//# sourceMappingURL=vector.js.map