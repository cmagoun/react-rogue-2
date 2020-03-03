import * as Entities from '../Entities';
import * as Move from '../systems/Move';

export const testMap = {
    legend: [
        {
            key: "#",
            create: (x, y, gm) => Entities.wall(x,y,gm),
            walkable: false
        },
        {
            key: "|",
            create: (x, y, gm) => Entities.door(x, y, "v", false, gm),
            walkable: true
        },
        {
            key: "-",
            create: (x, y, gm) => Entities.door(x, y, "h", false, gm),
            walkable: true
        },
        {
            key: "@",
            create: (x, y, gm) => Move.playerStartSpace(x, y, gm),
            walkable: true
        }
    ],
    map: [
        "",
        "",
        "",
        "",
        "",
        "",
        "                    #########",
        "                    #.......#",
        "              #######.......#",
        "              #.....|.......#",
        "              #.#####.......#",
        "              #.#   #.......#",
        "              #.#   #########",
        "          #####-####",
        "          #........#",
        "          #........#",
        "          #........#",
        "          #........#",
        "          #........#",
        "          #........#",
        "          #@.......#",
        "          ##########",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
    ]
}