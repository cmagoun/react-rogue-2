import * as Entities from '../Entities';
import * as Move from '../systems/Move';

export const testMap = {
    width: 80,
    height: 40,
    legend: [
        {
            key: "|",
            create: (x, y, gm) => Entities.door(x, y, "v", false, gm),
        },
        {
            key: "-",
            create: (x, y, gm) => Entities.door(x, y, "h", false, gm),
        },
        {
            key: "@",
            create: (x, y, gm) => Move.playerStartSpace(x, y, gm),
        },
        {
            key: "."
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