import * as Components from './Components';
import * as Door from './systems/Door';

export const player = (x, y, cm) => {
    return cm.createEntity("player")
        .add(Components.sprite("@", x, y, "transparent", "white", 100, null))
        .add(Components.pos(x, y));
} 

export const wall = (x, y, cm) => {
    return cm.createEntity(`wall/${x}/${y}`)
        .add(Components.sprite("", x, y, "darkgray", "white", "black", 50, null))
        .add(Components.pos(x, y))
        .add(Components.blockslos())
        .add(Components.persistvision(false))
        .add(Components.blocksmove(
            (e, req, answer) => {
                return {result:"wall", destination:undefined, entity:e}
            }));
}

export const door = (x, y, vh, open, cm) => {
    const glyph = Door.glyph(`door/${x}/${y}`, cm);
    

    const result = cm.createEntity(`door/${x}/${y}`)
        .add(Components.sprite(glyph, x, y, "transparent", "brown", null, null))
        .add(Components.verthoriz(vh))
        .add(Components.pos(x, y))
        .add(Components.canopen(open))
        .add(Components.persistvision(false))
        .add(Components.blocksmove(
            (e, req, answer) => {
                return {result:"interact", destination: {x,y}, entity:e, interact:Door.interact}
            }));

    if(!open) result.add(Components.blockslos());

    return result;
}


