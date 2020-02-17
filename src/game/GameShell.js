import {BaseGameManager} from "../ecs/GameManager";
import * as Entities from './Entities';
import * as Keyboard from '../utilities/keyboard';
import * as Vector from '../utilities/vector';
import * as Move from './systems/Move';
import { mapIndexKey } from "./Constants";
import { doLos } from "./systems/Shadowcast";

export const states = {
    INTRO: 0,
    INIT: 1,
    TEST:2,
    WAITING_FOR_INPUT: 99,
    ANIMATIONTEST: 100,
};

class GameShell extends BaseGameManager {
    constructor() {
        super();
        this.needLOSUpdate = true;
        this.drawList = [];
        this.cm.createIndex("ix_pos", "pos", pos => mapIndexKey(pos.vec));
        this.loop = this.turnLoop.bind(this);
    }

    lineOfSight() {
        if(this.needLOSUpdate || this.drawList.length === 0) this.drawList = doLos(this);
        this.needLOSUpdate = false;
        return this.drawList;
    }

    requestFullLOSUpdate() {
        this.needLOSUpdate = true;
    }

    player() {
        return this.cm.entity("player");
    }

    playerInput(key) {
        const player = this.player();


        if(Keyboard.isMovementKey(key) && this.gameState === states.WAITING_FOR_INPUT) {
            const dir = Keyboard.directionKey(key);
            const moveTo = Vector.add(dir)(player.pos.vec);
            Move.request(player.id, moveTo, this);
        }
    }

    start() {
        this.gameState = states.INTRO;
        requestAnimationFrame(this.loop);
    }

    turnDone() {
        //player moves over and over
        this.updateGameState(states.WAITING_FOR_INPUT);
    }

    turnLoop() {
        if(this.cm.performQueuedChanges()) this.update();
       

        switch(this.gameState) {
            case states.INTRO:
            case states.ANIMATIONTEST:
                break;

            case states.INIT:
                this.setupScene();
                this.updateGameState(states.TEST);
                break;

            case states.TEST:
                this.updateGameState(states.WAITING_FOR_INPUT)
                break;
        }

        requestAnimationFrame(this.loop);
    }

    toBlockLos() {
        return this.cm.entitiesWith(["blockslos", "pos"]);
    }

    toDraw() {
        return this.cm.entitiesWith(["sprite", "pos"]);
    }

    setupScene() {
        Entities.player(10, 10, this);

        Entities.wall(15, 10, this);
        Entities.wall(16, 10, this);
        Entities.door(17, 10, "h", false, this);
        Entities.wall(18, 10, this);
        Entities.wall(19, 10, this);

        Entities.wall(15, 15, this);
        Entities.wall(16, 15, this);
        Entities.wall(17, 15, this);
        Entities.wall(18, 15, this);
        Entities.wall(19, 15, this);


        Entities.wall(19, 11, this);
        Entities.wall(19, 12, this);
        Entities.wall(19, 13, this);
        Entities.wall(19, 14, this);

        Entities.wall(15, 11, this);
        Entities.wall(15, 12, this);
        Entities.door(15, 13, "v", false, this);
        Entities.wall(15, 14, this);

        Entities.widget(17, 13, this);
    }
}

export default GameShell;