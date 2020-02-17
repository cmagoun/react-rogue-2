import * as Move from './Move';

export const glyph = (key, gm) => () => {
    const door = gm.entity(key);
    if(door.canopen.open) return "\\";
    if(door.verthoriz.vh === "v") return "|";
    return "-";
    //return '\u23AF';
}

export const interact = (mover, to, door, gm) => {
    if(door.canopen.open) {
        Move.doMove(mover, to, gm);
        return;
    }

    door.edit("canopen", {open:true});
    door.remove("blockslos");
    
    gm.addLogMessage("You open the door.");
    gm.turnDone();
}