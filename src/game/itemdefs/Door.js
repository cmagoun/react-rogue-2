import * as Move from '../systems/Move';
import * as Components from './Components';
import * as Interaction from '../systems/Interaction';

export const create = (x, y, vh, open, gm) => {
    const gg = glyph(`door/${x}/${y}`, gm);
    
    const result = gm.createEntity(`door/${x}/${y}`)
        .add(Components.sprite(gg, x, y, "transparent", "brown", null, null))
        .add(Components.orientation(vh))
        .add(Components.pos(x, y, gm))
        .add(Components.canopen(open))
        .add(Components.persistvision(false))
        .add(Components.interacts(
            Interaction.interacts,
            interaction
        ));


    if(!open) result.add(Components.blockslos(gm));

    return result;
}


export const glyph = (key, gm) => () => {
    const door = gm.entity(key);
    if(door.canopen.open) return "\\";
    if(door.orientation.value === "v") return "|";
    return "-";
}

export const interaction = {
    fire: (props, gm) => {
        const {actor, entity, pos} = props;

        if(entity.canopen.open) {
            Move.doMove(actor, pos, gm);
            return;
        }

        entity.edit("canopen", {open:true});
        entity.remove("blockslos");
        gm.addLogMessage("You open the door.");
    },
    endsTurn: true
}
