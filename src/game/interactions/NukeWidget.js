import React from 'react';
import SingleEntityTargeter from "./SingleEntityTargeter"

export const interaction = {
    ui: (gm) => <SingleEntityTargeter possibleTargets={gm.taggedAs("widget")} flashColor="pink"/>,
    fire: (props, gm) => alert("BOOM"),
    endsTurn: true  
}