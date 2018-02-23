import { MOVE,CHANGE_STATE } from "./types";

export const movePiece = (direction) => {
  return {
    type: MOVE,
    direction
  };
};

export const changeState = () => {
  return {
    type: CHANGE_STATE
  };
};
