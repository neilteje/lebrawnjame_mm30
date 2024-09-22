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
const fs_1 = require("fs");
const game_1 = __importDefault(require("./game"));
const computer_1 = __importDefault(require("./player/computer"));
const network_1 = __importDefault(require("./player/network"));
const socket_server_1 = __importDefault(require("./util/socket-server"));
const promises_1 = require("fs/promises");
const path_1 = __importDefault(require("path"));
const log_1 = require("./log");
const process_1 = require("process");
const USAGE = `Proper usage: npm start [team0port] [team1port]

    Env variables:
    OUTPUT = The location to which the gamelog will be output, defaults to gamelogs/game_DATE.json
    DEBUG = Set to 1 to enable debug output
`;
function setupPlayerForPort(team, port, log) {
    return __awaiter(this, void 0, void 0, function* () {
        if (port <= 0) {
            console.log(`Created computer for team ${team}`);
            return new computer_1.default(team);
        }
        console.log(`Waiting for connection from team ${team} on ${port}`);
        const server = new socket_server_1.default();
        yield server.connect(port);
        if (server.connected()) {
            console.log(`Connected to team ${team} on ${port}`);
        }
        else {
            console.error(`Failed to connect to team ${team} on ${port}`);
        }
        return new network_1.default(team, server, log);
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        if (process.argv.length != 4) {
            console.error(USAGE);
            (0, process_1.exit)(2);
        }
        let team0Port = undefined;
        try {
            team0Port = parseInt(process.argv[2]);
        }
        catch (_a) {
            // pass
        }
        if (team0Port === undefined || Number.isNaN(team0Port)) {
            console.error("Team 0 port must be a number!");
            (0, process_1.exit)(2);
        }
        let team1Port = undefined;
        try {
            team1Port = parseInt(process.argv[3]);
        }
        catch (_b) {
            // pass
        }
        if (team1Port === undefined || Number.isNaN(team1Port)) {
            console.error("Team 1 port must be a number!");
            (0, process_1.exit)(2);
        }
        const log = new log_1.Log();
        const players = yield Promise.all([
            setupPlayerForPort(0, team0Port, log),
            setupPlayerForPort(1, team1Port, log),
        ]);
        console.log("Game started!");
        const game = new game_1.default(players, log);
        let continues = true;
        while (continues) {
            continues = yield game.runTurn();
        }
        console.log("Game ended!");
        const OUTPUT = process.env["OUTPUT"] ||
            `./gamelogs/gamelog_${new Date().toISOString().replace(/[-:]/g, "_").split(".")[0]}.json`;
        console.log(`Writing gamelog to ${OUTPUT}...`);
        yield (0, promises_1.mkdir)(path_1.default.dirname(OUTPUT), {
            recursive: true,
        });
        yield (0, fs_1.writeFileSync)(OUTPUT, log.toString());
        console.log("Done");
    });
}
main();
//# sourceMappingURL=main.js.map