
import * as Move from '../systems/Move';
import * as Door from '../itemdefs/Door';

export const testMap = {
    width: 80,
    height: 40,
    legend: [
        {
            key: "|",
            create: (x, y, gm) => Door.create(x, y, "v", false, gm),
        },
        {
            key: "-",
            create: (x, y, gm) => Door.create(x, y, "h", false, gm),
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