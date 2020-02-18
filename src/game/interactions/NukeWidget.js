import React from 'react';
import SingleEntityTargeter from "./SingleEntityTargeter"

export const interaction = {
    ui: (info, gm) => <SingleEntityTargeter info={info} possibleTargets={gm.taggedAs("widget")} flashColor="pink"/>,
    fire: (info, gm) => {
        info.targets[0].destroy();
        gm.requestFullLOSUpdate();
    },
    endsTurn: true  
}