"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PLANE_STATS = exports.PLANE_SPAWN_SPREAD = exports.SPAWNS = exports.DEBUG = exports.DISCONNECT_STRIKES = exports.RESPONSE_TIMEOUT = exports.INITIAL_RESPONSE_TIMEOUT = exports.COLLISION_RADIUS = exports.ATTACK_STEPS = exports.MAX_SPEND = exports.TURNS = exports.MAP_SIZE = void 0;
const data_1 = require("./plane/data");
const vector_1 = require("./plane/vector");
exports.MAP_SIZE = 100; // Size of map
exports.TURNS = 500; // Number of turns
exports.MAX_SPEND = 1000; // The maximum points that can be spent on planes
exports.ATTACK_STEPS = 15; // Number of steps per attack detection
exports.COLLISION_RADIUS = 1; // Distance at which planes collide and both explode
exports.INITIAL_RESPONSE_TIMEOUT = 15000; // The number of milliseconds allowed for a client to connect before they are disconnected
exports.RESPONSE_TIMEOUT = 2500; // The number of milliseconds allowed before a read/write times out, gives a disconnect strike
exports.DISCONNECT_STRIKES = 3; // The number of disconnect strikes before the client is disconnected and ignored
exports.DEBUG = !["0", "", undefined].includes(process.env.DEBUG);
// Spawns for each team
exports.SPAWNS = [
    {
        position: new vector_1.Vector(0, exports.MAP_SIZE / 2 - 5),
        angle: vector_1.Direction.SOUTH,
    },
    {
        position: new vector_1.Vector(0, -exports.MAP_SIZE / 2 + 5),
        angle: vector_1.Direction.NORTH,
    },
];
exports.PLANE_SPAWN_SPREAD = 2.5; // How far apart planes from same team spawn from each other
// Plane type => plane stats
exports.PLANE_STATS = {
    [data_1.PlaneType.STANDARD]: {
        cost: 200,
        maxHealth: 20,
        turnSpeed: 15,
        speed: 2,
        attack: 1,
        attackRange: 5,
        attackSpreadAngle: 30,
    },
    [data_1.PlaneType.FLYING_FORTRESS]: {
        cost: 300,
        maxHealth: 30,
        turnSpeed: 10,
        speed: 1,
        attack: 1,
        attackRange: 8,
        attackSpreadAngle: 30,
    },
    [data_1.PlaneType.THUNDERBIRD]: {
        cost: 200,
        maxHealth: 10,
        turnSpeed: 15,
        speed: 2.5,
        attack: 1,
        attackRange: 5,
        attackSpreadAngle: 30,
    },
    [data_1.PlaneType.SCRAPYARD_RESCUE]: {
        cost: 100,
        maxHealth: 5,
        turnSpeed: 10,
        speed: 1.5,
        attack: 1,
        attackRange: 4,
        attackSpreadAngle: 20,
    },
    [data_1.PlaneType.PIGEON]: {
        cost: 10,
        maxHealth: 1,
        turnSpeed: 30,
        speed: 0.5,
        attack: 0,
        attackRange: 0,
        attackSpreadAngle: 0,
    },
};
//# sourceMappingURL=config.js.map