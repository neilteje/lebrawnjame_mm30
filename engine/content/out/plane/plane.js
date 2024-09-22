"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plane = void 0;
const config_1 = require("../config");
class Plane {
    constructor(id, team, type, position, angle // Angle that faces [0, 360) so 0 = East, 90 = North, etc.
    ) {
        this.id = id;
        this.team = team;
        this.type = type;
        this.position = position;
        this.angle = angle;
        this.stats = config_1.PLANE_STATS[type];
        this.health = this.stats.maxHealth;
    }
}
exports.Plane = Plane;
//# sourceMappingURL=plane.js.map