
import * as Animate from './Animate';
import { mapIndexKey, defaultSlideTime } from '../Constants';
import {askMover, askMoveSpace} from './ask/MoveSpace';

export const request = (id, moveTo, gm) => {
    const mover = gm.entity(id);

    const onSpace = gm.cm.entitiesIn("ix_pos", mapIndexKey(moveTo));
    if(onSpace.length === 0) doMove(mover, moveTo, gm);

    const request = {onSpace, mover, moveTo};
    let answer = {result:"move", destination:moveTo, entity:undefined};
    answer = askMoveSpace(onSpace, request, answer, gm);
    answer = askMover(mover, request, answer, gm);

    switch(answer.result) {
        case "move":
            doMove(mover, answer.destination, gm);
            break;

        case "interact":
            answer.entity.interacts.onInteract(mover, moveTo, answer.entity, gm);
            break;

        default:
            break; 
    }
}

export const doMove = (mover, to, gm) => {
    Animate.slide(mover, mover.sprite.draw, to, defaultSlideTime);
    mover.edit("pos", {vec: {x:to.x, y:to.y}});

    if(mover.id === "player") {
        gm.requestFullLOSUpdate();
    }
    else {
        //did the entity move in/out of the LOS of player?
        //gm.requestSingleLOSUpdate(mover);
    }

    gm.turnDone(); 
}