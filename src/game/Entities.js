import * as Components from './Components';
import * as Door from './systems/Door';
import * as Widget from './systems/Widget';

export const player = (x, y, cm) => {
    return cm.createEntity("player")
        .add(Components.sprite("@", x, y, "transparent", "white", 100))
        .add(Components.pos(x, y));
} 

export const wall = (x, y, cm) => {
    return cm.createEntity(`wall/${x}/${y}`)
        .add(Components.sprite("", x, y, "darkgray", "white", "black", 50))
        .add(Components.pos(x, y))
        .add(Components.blockslos())
        .add(Components.persistvision(false))
        .add(Components.blocksmove(
            (e, req, answer) => {
                return {result:"wall", destination:undefined, entity:e}
            }));
}

export const widget = (x, y, cm) => {
    return cm.createEntity(`widget/${x}/${y}`)
        .add(Components.sprite("W", x, y, "transparent", "lightgreen"))
        .add(Components.pos(x,y))
        .add(Components.interacts(
            Widget.blocksmove,
            Widget.interacts
        ));
}

export const door = (x, y, vh, open, cm) => {
    const glyph = Door.glyph(`door/${x}/${y}`, cm);
    
    const result = cm.createEntity(`door/${x}/${y}`)
        .add(Components.sprite(glyph, x, y, "transparent", "brown", null, null))
        .add(Components.verthoriz(vh))
        .add(Components.pos(x, y))
        .add(Components.canopen(open))
        .add(Components.persistvision(false))
        .add(Components.interacts(
            Door.blocksmove,
            Door.interacts
        ));


    if(!open) result.add(Components.blockslos());

    return result;
}


