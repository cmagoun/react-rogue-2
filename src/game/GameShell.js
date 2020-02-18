import {BaseGameManager} from "../ecs/GameManager";
import * as Entities from './Entities';
import * as Keyboard from '../utilities/keyboard';
import * as Vector from '../utilities/vector';
import * as Move from './systems/Move';
import { mapIndexKey } from "./Constants";
import { doLos } from "./systems/Shadowcast";
import * as Animate from './systems/Animate';

export const states = {
    INTRO: 0,
    INIT: 1,
    PLAYFIELD: 2,
    TURN_START:3,
    TURN_OVER:4,
    WAITING_FOR_INPUT: 99,
    ANIMATIONTEST: 100,
};

class GameShell extends BaseGameManager {
    constructor() {
        super();
        this.needLOSUpdate = true;
        this.drawList = [];
        this.turn = 0;
        this.readyInteraction = {};
        this.cm.createIndex("ix_pos", "pos", pos => mapIndexKey(pos.vec));
        this.loop = this.turnLoop.bind(this);
    }

    continueTurn() {
        this.updateGameState(states.WAITING_FOR_INPUT);
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

    cancelInteraction() {
        this.readyInteraction = {};
        this.updateGameState(states.WAITING_FOR_INPUT);
    }

    fireReadyInteraction(props) {
        const end = this.readyInteraction.endsTurn;

        this.readyInteraction.fire(props, this);
        this.readyInteraction = {};
        if(end) {
            this.turnDone();
        } else {
            this.continueTurn();
        }
    }

    setReadyInteraction(interaction) {
        this.readyInteraction = interaction;
    }

    start() {
        this.gameState = states.INTRO;
        requestAnimationFrame(this.loop);
    }

    taggedAs(tag) {
        return this.cm
            .entitiesWith("tag")
            .filter(e => e.tag.value === tag);
    }


    turnDone() {
        //player moves over and over
        this.updateGameState(states.TURN_OVER);
    }



    turnLoop() {
        if(this.cm.performQueuedChanges()) this.update();
       

        switch(this.gameState) {
            case states.INTRO:
            case states.ANIMATIONTEST:
            case states.WAITING_FOR_INPUT:
                break;

            case states.INIT:
                this.turn = 0;
                this.setupScene();
                this.updateGameState(states.PLAYFIELD);
                this.updateGameState(states.TURN_START);
                break;

            case states.TURN_START:
                this.updateGameState(states.WAITING_FOR_INPUT)
                break;

            case states.TURN_OVER:
                this.turn++;
                this.updateGameState(states.WAITING_FOR_INPUT);
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
        Entities.nukeWidget(8, 13, this);
    }
}

export default GameShell;