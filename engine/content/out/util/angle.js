"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeAngle = exports.degDiff = exports.deg = exports.rad = void 0;
function rad(degrees) {
    return (degrees / 360) * 2 * Math.PI;
}
exports.rad = rad;
function deg(rad) {
    return (rad / 2 / Math.PI) * 360;
}
exports.deg = deg;
// Takes two angles deg1 and deg2, and computes the differences between them
// degDiff(45, 90) == 45
// degDiff(30, 0) == 30
// degDiff(-30, 300) == 30
function degDiff(deg1, deg2) {
    while (deg1 < 0) {
        deg1 += 360;
    }
    while (deg2 <= 0) {
        deg2 += 360;
    }
    return Math.abs(deg1 - deg2);
}
exports.degDiff = degDiff;
// Takes an angle and normalizes it to [0, 360)
function normalizeAngle(angle) {
    let normalized = angle % 360;
    while (normalized < 0) {
        normalized += 360;
    }
    return normalized;
}
exports.normalizeAngle = normalizeAngle;
//# sourceMappingURL=angle.js.map