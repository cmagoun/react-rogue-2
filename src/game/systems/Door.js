import * as Move from './Move';

export const glyph = (key, gm) => () => {
    const door = gm.entity(key);
    if(door.canopen.open) return "\\";
    if(door.orientation.value === "v") return "|";
    return "-";
}

export const interaction = {
    fire: (props, gm) => {
        if(props.entity.canopen.open) {
            Move.doMove(props.actor, props.pos, gm);
            return;
        }

        props.entity.edit("canopen", {open:true});
        props.entity.remove("blockslos");
        gm.addLogMessage("You open the door.");
    },
    endsTurn: true
}
