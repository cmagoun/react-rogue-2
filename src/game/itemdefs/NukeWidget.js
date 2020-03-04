import React from 'react';
import SingleEntityTargeter from "../../ui/targeters/SingleEntityTargeter";
import * as Components from './Components';
import * as Interaction from '../systems/Interaction';

export const create = (x, y, gm) => {
    return gm.createEntity("nuke")
        .add(Components.sprite("!", x, y, "white", "red"))
        .add(Components.pos(x, y, gm))
        .add(Components.interacts(
            Interaction.blocksmove,
            interaction
        ))
}

export const interaction = {
    ui: (info, gm) => <SingleEntityTargeter info={info} possibleTargets={gm.taggedAs("widget")} flashColor="pink"/>,
    fire: (info, gm) => {
        info.targets[0].destroy();
        gm.requestFullLOSUpdate(); //I can't quite get away from this yet
        info.entity.remove("interacts");
        info.entity.add(Components.blocksmove())
        info.entity.edit("sprite", {fcolor:"white", bcolor:"transparent"});
    },
    endsTurn: true  
}