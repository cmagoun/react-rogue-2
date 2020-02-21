//this allows us to do set pieces
export const createMap = (map, gm) => {
    const creator = new Map();
    map.legend.forEach(item => creator.set(item.key, item.create));

    map.map.forEach((srow, y) => {
        for(let x = 0; x < srow.length; x++) {
            const cell = srow.charAt(x);
            if(cell !== "" && cell !== " ") {
                creator.get(cell)(x, y, gm);
            }
        }
    });
}