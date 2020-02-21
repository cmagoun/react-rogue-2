import * as Entities from '../Entities';
import * as Move from '../systems/Move';

export const testMap = {
    legend: [
        {
            key: "#",
            create: (x, y, gm) => Entities.wall(x,y,gm)
        },
        {
            key: "|",
            create: (x, y, gm) => Entities.door(x, y, "v", false, gm)
        },
        {
            key: "-",
            create: (x, y, gm) => Entities.door(x, y, "h", false, gm)
        },
        {
            key: "@",
            create: (x, y, gm) => Move.playerStartSpace(x, y, gm)
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
        "                    #       #",
        "              #######       #",
        "              #     |       #",
        "              # #####       #",
        "              # #   #       #",
        "              # #   #########",
        "          #####-####",
        "          #        #",
        "          #        #",
        "          #        #",
        "          #        #",
        "          #        #",
        "          #        #",
        "          #@       #",
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