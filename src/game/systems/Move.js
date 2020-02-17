import * as Vector from '../../utilities/vector';
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

        case "door":
            checkDoor(mover, answer.destination, answer.entity, gm);
            break;

        default:
            break; 
    }
}

const checkDoor = (mover, to, door, gm) => {
    if(door.canopen.open) {
        doMove(mover, to, gm);
        return;
    }

    door.edit("canopen", {open:true});
    gm.turnDone();
}

const doMove = (mover, to, gm) => {
    Animate.slide(mover, mover.sprite.draw, to, defaultSlideTime);
    mover.edit("pos", {vec: {x:to.x, y:to.y}});
    gm.turnDone(); 
}