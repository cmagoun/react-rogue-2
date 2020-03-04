import * as Components from './Components';

export const create = (x, y, gm) => {
    return gm.createEntity("player")
        .add(Components.sprite("@", x, y, "transparent", "white", 100))
        .add(Components.pos(x, y, gm));
} 
