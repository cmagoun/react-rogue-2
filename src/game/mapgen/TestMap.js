import * as Move from '../systems/Move';
import * as Door from '../itemdefs/Door';
import * as Player from '../itemdefs/Player';


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
            create: (x, y, gm) => Player.placeAt(x, y, gm),
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