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

export const pos = (x, y) => {
    return {
        cname:"pos",
        vec: {x,y}
    };
}

export const sprite = (glyph, x, y, bcolor, fcolor, z, border, show) => {
    return {
        cname: "sprite",
        glyph,
        draw: {x,y},
        bcolor: bcolor || "transparent",
        fcolor: fcolor || "white", 
        border: border || "",
        z: z || 0,
        show: show === undefined ? true : show,
    };
}