import * as Components from '../Components';
import * as Vector from '../../utilities/vector';
import * as Entities from '../../game/Entities';

const spaceKey = (x, y) => `${x},${y}`;
const spaceVec = (vec) => `${vec.x},${vec.y}`;

//this allows us to do set pieces
//spaces is {walkable: Map(), used: Map()} that shows 
//a. if we've touched this space, and b. if this space is walkable
export const readMap = (map, spaces, gm) => {
    const creator = new Map();
    map.legend.forEach(item => creator.set(item.key, item));

    map.map.forEach((srow, y) => {
        for(let x = 0; x < srow.length; x++) {
            const key = srow.charAt(x);
            if(key !== "" && key !== " ") {
                const cell = creator.get(key);
                cell.create(x, y, gm);

                if(cell.walkable) spaces.walkable.set(spaceKey(x,y), 1);
                spaces.used.set(spaceKey(x,y), 1);       
            }
        }
    });
}

export const facing = (value) => {
    return {
        cname: "facing",
        value
    };
}

const done = () => {
    return {
        cname: "done",
    };
}

export const makeDigger = (x, y, fac, index, gm) => {
    return gm.createEntity(`digger_${index}`)
        .add(Components.pos(x, y, gm))
        .add(facing(fac))
        .add(Components.tag("digger"));
}

const dig = (digger, spaces, gm) => {
    //generally, we are going to follow this procedure each iteration:
    //1. digger extends the hallway some distance straight ahead
    //2. digger chooses a random feature to place at the end of his dig
    //   for instance, he could "turn right", or "place room", or "intersection"
    //   at the end of his dig
    const distance = Vector.getRandomInt(3, 10);

    for(let i = 0; i < distance - 1; i++) {
        if(!digger.done) goStraight(digger, spaces, gm);
    }

    const dieRoll = Vector.getRandomInt(1,2);

    switch(dieRoll) {
        case 1:

    }
}

export const turn = (rl, digger, spaces, gm) => {
    const facing = newFacing(digger.facing.value, rl);
    const myPos = digger.pos.vec;

    placeWallsOnEitherSide(myPos, facing, spaces, gm);
    placeWallOnOuterDiagonal(myPos, facing, rl, spaces, gm);

    digger.edit("facing", {value:facing});
}

export const goStraight = (digger, spaces, gm) => {
    const facing = digger.facing.value;
    const moveTo = Vector.add(digger.pos.vec)(Vector.direction(facing));
    const key = spaceVec(moveTo);

    //we have tunneled into an existing tunnel, and we are done
    if(spaces.walkable.has(key)) {
        digger.add(done());
        return;
    }
        
    //you are hitting a wall go ahead and break this... let's see what happens
    if(spaces.used.has(key)) {
        const onSpace = gm.entitiesIn("ix_pos", key);

        onSpace.forEach(e => {
            if(e.tag.value === "wall") e.destroy();
        });
    }

    placeWallsOnEitherSide(moveTo, facing, spaces, gm);
    
    spaces.walkable.set(key, 1); //I think this is right
    spaces.used.set(key, 1);

    digger.edit("pos", {vec:moveTo});
    digger.edit("sprite", {draw:moveTo});
    
}

export const digMap = (iterations, spaces, gm) => {
    while(iterations > 0) {
        const diggers = gm.taggedAs("digger");
        diggers.forEach(digger => dig(digger, spaces, gm));
        iterations--;
    }
}

const onEitherSide = (vec, facing, spaces) => {
    const result = [];

    const checkDir = (dir, spaces) => {
        const vc = Vector.add(vec)(Vector.direction(dir));
        if(!isUsed(vc, spaces)) result.push(vc);
    }

    if(facing === "e" || facing === "w") {
        ["n", "s"].forEach(d => checkDir(d, spaces));
    } else {
        ["e", "w"].forEach(d => checkDir(d, spaces));
    }

    return result;
}

const newFacing = (oldFacing, rl) => {
    switch(oldFacing) {
        case "n":
        case "north":
            return rl === "r" ? "e" : "w";

        case "s":
        case "south":
            return rl === "r" ? "w" : "e";

        case "e":
        case "east":
            return rl === "r" ? "s" : "n";

        case "w":
        case "west":
            return rl === "r" ? "n" : "s";
    }
}

const outerDiagonal = (facing, rl) => {
    switch(facing) {
        case "n":
        case "north":
            return rl === "r" ? {x:-1, y:1} : {x:1, y:1};

        case "s":
        case "south":
            return rl === "r" ? {x:1, y:-1} : {x:-1, y:-1};


        case "e":
        case "east":
            return rl === "r" ? {x:-1, y:-1} : {x:-1, y:1};

        case "w":
        case "west":
            return rl === "r" ? {x:1, y:1} : {x:1, y:-1};
    }
}

const placeWallsOnEitherSide = (vec, facing, spaces, gm) => {
    //if nothing is there currently, put walls on either side
    //of the new position, then move the digger into that space
    const toPlace = onEitherSide(vec, facing, spaces);
    toPlace.forEach(p => {
        Entities.wall(p.x, p.y, gm);
        spaces.used.set(spaceVec(p), 1);
    });
}

const placeWallOnOuterDiagonal = (vec, facing, rl, spaces, gm) => {
    const od = outerDiagonal(facing, rl);
    const toPlace = Vector.add(vec)(od);
    if(!isUsed(toPlace, spaces)) Entities.wall(toPlace.x, toPlace.y, gm);
}

const isUsed = (vec, spaces) => spaces.used.has(spaceVec(vec));

