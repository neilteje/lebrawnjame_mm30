"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = void 0;
const config_1 = require("./config");
const logger_1 = require("./logger");
class Log {
    constructor() {
        this.planeStats = config_1.PLANE_STATS;
        this.damageEvents = [];
        this.validationEvents = [];
        this.turns = [];
        this.output = "";
    }
    addDamageEvent(event) {
        logger_1.Logger.log(`[Turn ${event.turn}] [Damage event] ${event.type}: plane ${event.attacked} damaged ${event.by ? "by " + event.by + " " : ""}for ${event.damage} damage, ${event.dead ? "now dead" : "still alive"}`);
        this.damageEvents.push(event);
    }
    logValidationError(team, message) {
        logger_1.Logger.error(`[Validation Error] Player ${team} ${message}`);
        this.validationEvents.push({
            turn: logger_1.Logger.turn,
            team,
            message,
        });
    }
    addTurn(turn) {
        this.turns.push(turn);
    }
    finish(wins, stats) {
        this.output = JSON.stringify({
            wins,
            stats,
            planeStats: this.planeStats,
            damageEvents: this.damageEvents,
            validationEvents: this.validationEvents,
            turns: this.turns,
        }, undefined, "\t");
    }
    toString() {
        return this.output;
    }
}
exports.Log = Log;
//# sourceMappingURL=log.js.map