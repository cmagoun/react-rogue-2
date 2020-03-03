import * as Components from './Components';
import * as Interaction from './systems/Interaction';
import * as Door from './systems/Door';
import * as Widget from './systems/Widget';
import * as NukeWidget from './interactions/NukeWidget';

export const player = (x, y, gm) => {
    return gm.createEntity("player")
        .add(Components.sprite("@", x, y, "transparent", "white", 100))
        .add(Components.pos(x, y, gm));
} 

export const wall = (x, y, gm) => {
    return gm.createEntity(`wall/${x}/${y}`)
        .add(Components.sprite("", x, y, "darkgray", "white", "black", 50))
        .add(Components.pos(x, y, gm))
        .add(Components.tag("wall"))
        .add(Components.blockslos(gm))
        .add(Components.persistvision(false))
        .add(Components.blocksmove());
}

export const widget = (x, y, gm) => {
    return gm.createEntity(`widget/${x}/${y}`)
        .add(Components.sprite("W", x, y, "transparent", "lightgreen"))
        .add(Components.pos(x,y, gm))
        .add(Components.tag("widget"))
        .add(Components.interacts(
            Interaction.blocksmove,
            Widget.interaction
        ));
}

export const door = (x, y, vh, open, gm) => {
    const glyph = Door.glyph(`door/${x}/${y}`, gm);
    
    const result = gm.createEntity(`door/${x}/${y}`)
        .add(Components.sprite(glyph, x, y, "transparent", "brown", null, null))
        .add(Components.orientation(vh))
        .add(Components.pos(x, y, gm))
        .add(Components.canopen(open))
        .add(Components.persistvision(false))
        .add(Components.interacts(
            Interaction.blocksmove,
            Door.interaction
        ));


    if(!open) result.add(Components.blockslos(gm));

    return result;
}

export const nukeWidget = (x, y, gm) => {
    return gm.createEntity("nuke")
        .add(Components.sprite("!", x, y, "white", "red"))
        .add(Components.pos(x, y, gm))
        .add(Components.interacts(
            Interaction.blocksmove,
            NukeWidget.interaction
        ))
}


