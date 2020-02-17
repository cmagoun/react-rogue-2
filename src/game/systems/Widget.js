export const blocksmove = (e, req, answer) => {
    return {result:"interact", destination: req.to, entity:e}
};

export const interacts = (mover, to, widget, gm) => {
    gm.addLogMessage("You touch a widget.");
    gm.turnDone();
}