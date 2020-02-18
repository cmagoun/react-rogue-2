import {states} from '../GameShell';

export const blocksmove = (e, req, answer) => {
    return {result:"interact", destination: req.to, entity:e}
};

export const start = (interaction, props, gm) => {
    if(interaction.ui !== undefined) {
        gm.setReadyInteraction(interaction);
        gm.updateGameState(states.INTERACTION_UI, interaction.ui(props, gm));
    } else {
        //fire the interaction without any UI
        interaction.fire({...props}, gm);
        if(interaction.endsTurn) {
            gm.turnDone();
        } else {
            gm.continueTurn();
        }
    }
}