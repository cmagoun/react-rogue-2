import {BaseGameManager} from "../ecs/GameManager";
import * as Keyboard from '../utilities/keyboard';
import * as Vector from '../utilities/vector';
import * as Move from './systems/Move';
import { mapIndexKey } from "./Constants";
import { doLos } from "./systems/Shadowcast";
import {testMap} from './mapgen/TestMap';
import * as MapCreator from './mapgen/MapCreator';

import * as Door from './itemdefs/Door';
import * as Wall from './itemdefs/Wall';
import * as Player from './itemdefs/Player';
import * as Widget from './itemdefs/Widget';
import * as NukeWidget from './itemdefs/NukeWidget';

export const states = {
    INTRO: 0,
    INIT: 1,
    PLAYFIELD: 2,
    TURN_START:3,
    TURN_OVER:4,
    INTERACTION_UI: 98,
    WAITING_FOR_INPUT: 99,
    ANIMATIONTEST: 1000,
    MAPTEST: 1001,
    DIGTEST: 1002,
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
            case states.INTERACTION_UI:
            case states.ANIMATIONTEST:
            case states.DIGTEST:
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

            case states.MAPTEST:
                Player.create(-99, -99, this);
                MapCreator.initMap(80, 40, this);

                MapCreator.readMap(testMap, new Map(), this);
                this.updateGameState(states.PLAYFIELD);
                this.updateGameState(states.TURN_START);
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
        Player.create(10, 10, this);

        Wall.create(15, 10, this);
        Wall.create(16, 10, this);
        Door.create(17, 10, "h", false, this);
        Wall.create(18, 10, this);
        Wall.create(19, 10, this);

        Wall.create(15, 15, this);
        Wall.create(16, 15, this);
        Wall.create(17, 15, this);
        Wall.create(18, 15, this);
        Wall.create(19, 15, this);


        Wall.create(19, 11, this);
        Wall.create(19, 12, this);
        Wall.create(19, 13, this);
        Wall.create(19, 14, this);

        Wall.create(15, 11, this);
        Wall.create(15, 12, this);
        Door.create(15, 13, "v", false, this);
        Wall.create(15, 14, this);

        Widget.create(17, 13, this);
        Widget.create(3,3,this);
        Widget.create(11, 14, this);
        NukeWidget.create(8, 13, this);
    }
}

export default GameShell;