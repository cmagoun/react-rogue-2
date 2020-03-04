import * as Components from './Components';
import * as Interaction from '../systems/Interaction';

export const create = (x, y, gm) => {
    return gm.createEntity(`widget/${x}/${y}`)
        .add(Components.sprite("W", x, y, "transparent", "lightgreen"))
        .add(Components.pos(x,y, gm))
        .add(Components.tag("widget"))
        .add(Components.interacts(
            Interaction.blocksmove,
            interaction
        ));
}

export const interaction = {
    fire: (props, gm) => gm.addLogMessage("You touch a widget."),
    endsTurn: true
}