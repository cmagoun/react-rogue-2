export const blockslos = () => {
    return {
        cname:"blockslos"
    }
}

export const blocksmove = (onMoveSpace) => {
    return {
        cname: "blocksmove",
        onMoveSpace
    };
}

export const canopen = (open) => {
    return {
        cname:"canopen",
        open
    };
}

export const verthoriz = (vh) => {
    return {
        cname:"verthoriz",
        vh
    }
}

export const persistvision = (seen) => {
    return {
        cname:"persistvision",
        seen
    }
}

export const pos = (x, y) => {
    return {
        cname:"pos",
        vec: {x,y}
    };
}

export const sprite = (glyph, x, y, bcolor, fcolor, z, border) => {
    return {
        cname: "sprite",
        glyph,
        draw: {x,y},
        bcolor: bcolor || "transparent",
        fcolor: fcolor || "white", 
        border: border || "",
        z: z || 0,
        //show: show === undefined ? true : show,
    };
}