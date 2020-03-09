import React from 'react';
import SingleEntityTargeter from "../../ui/targeters/SingleEntityTargeter";
import * as Components from './Components';
import * as Interaction from '../systems/Interaction';

//this is just a test entity created to test the idea of
//interactions invoking a targeter and then firing once the targeter
//has resolved

export const create = (x, y, gm) => {
    return gm.createEntity()
        .add(Components.sprite("!", x, y, "white", "red"))
        .add(Components.pos(x, y, gm))
        .add(Components.interacts(
            Interaction.interacts,
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