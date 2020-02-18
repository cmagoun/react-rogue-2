import React from 'react';
import SingleEntityTargeter from "./SingleEntityTargeter"
import * as Components from '../Components';

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