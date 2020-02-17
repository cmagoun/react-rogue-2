export const glyph = (key, gm) => () => {
    const door = gm.entity(key);
    if(door.canopen.open) return "\\";
    if(door.verthoriz.vh === "v") return "|";
    return '\u23AF';
}