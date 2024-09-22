"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SteerInputResponseSchema = exports.PlaneSelectResponseSchema = exports.HelloWorldResponseSchema = exports.RequestPhase = exports.Player = void 0;
const zod_1 = require("zod");
const data_1 = require("../plane/data");
const schema_1 = require("../util/schema");
class Player {
    constructor(team, damage = 0) {
        this.team = team;
        this.damage = damage;
    }
}
exports.Player = Player;
var RequestPhase;
(function (RequestPhase) {
    RequestPhase["HELLO_WORLD"] = "HELLO_WORLD";
    RequestPhase["PLANE_SELECT"] = "PLANE_SELECT";
    RequestPhase["STEER_INPUT"] = "STEER_INPUT";
    RequestPhase["FINISH"] = "FINISH";
})(RequestPhase || (exports.RequestPhase = RequestPhase = {}));
exports.HelloWorldResponseSchema = zod_1.z.object({
    good: zod_1.z.literal(true),
});
exports.PlaneSelectResponseSchema = zod_1.z
    .record(zod_1.z.nativeEnum(data_1.PlaneType), zod_1.z.number())
    .transform(schema_1.objectToMap);
exports.SteerInputResponseSchema = zod_1.z
    .record(zod_1.z.string(), zod_1.z.number())
    .transform(schema_1.objectToMap);
//# sourceMappingURL=index.js.map