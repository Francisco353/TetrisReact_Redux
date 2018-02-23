
import { MOVE,CHANGE_STATE } from '../actions/types';
import PieceFactory from '../pieces/PieceFactory';
import PieceEnum from '../pieces/PieceEnum';
import {Board} from '../board/Board';
import CompleteBoard from '../board/CompleteBoard';

export default function(state = new CompleteBoard(new Board(),(new PieceFactory()).createPiece(PieceEnum.enumValues[(Math.floor(Math.random() * PieceEnum.enumValues.length-1) + 1)].name)), action) {
   switch (action.type) {
     case MOVE:
       state.movePiece(action.direction);
       break;
      case CHANGE_STATE:
        state.updatePieceState();
        break;
      default:
       return state
}
const newState = Object.assign({},state);
return newState;
}
