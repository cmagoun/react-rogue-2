import {ask} from './Ask';

export const checkMoveSpace = ["blocksmove", "interacts"];
export const checkMover = [];
export const askMoveSpace = ask(checkMoveSpace, comp => comp.onMoveSpace);
export const askMover = ask(checkMover, comp => comp.onMover);

//defaults
// request = {onSpace, mover, moveTo}
// answer = {result:"move", destination:request.moveTo, entity:undefined};
// export const fights = (entity, req, answer, gm) => {
//     return req.mover.fights && req.mover.fights.faction !== entity.fights.faction
//         ? {result:"fight", entity, destination:undefined}
//         : {result:"blocked", entity, destination:undefined};
// }

// export const pickup = (entity, req, answer, gm) => {
//     if(answer.move === false) return answer;
//     return {result:"pickup", destination:req.moveTo, entity};
// }
