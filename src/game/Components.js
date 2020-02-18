export const blockslos = (gm) => {
    return {
        cname:"blockslos",
        onRemove: () => gm.requestFullLOSUpdate()
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

export const interacts = (onMoveSpace, interaction) => {
    return {
        cname: "interacts",
        onMoveSpace,
        interaction
    }
}

export const orientation = (value) => {
    return {
        cname:"orientation",
        value
    }
}

export const persistvision = (seen) => {
    return {
        cname:"persistvision",
        seen
    }
}

export const pos = (x, y, gm) => {
    return {
        cname:"pos",
        vec: {x,y},
        onEdit: (eid) => {if(eid === "player") gm.requestFullLOSUpdate();},
        onRemove: () => gm.requestFullLOSUpdate()
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

export const tag = (tag) => {
    return {
        cname: "tag",
        value: tag
    }
}
