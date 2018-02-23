import PieceFactory from '../pieces/PieceFactory';
import PieceEnum from '../pieces/PieceEnum';
import {BOARD_COLUMNS,BOARD_ROWS} from '../constants/index';
import Block from "../pieces/Block"
import { LEFT,RIGHT,DOWN } from '../constants/index';

export default class CompleteBoard{
  constructor(board,piece){
    board.updateBoardRepresentation(privateMethods.addPiece(board.board,piece));
    this.board = board;
    this.piece = piece;
    this.updateBoardView = function(){
      const refreshedboard = privateMethods.refreshBoard(this.board.board);
      this.board.updateBoardRepresentation(privateMethods.addPiece(refreshedboard,this.piece));
    };
   this.movePiece = function(direction){
     const pieceClass = this.piece.className;
     if(privateMethods.moveAllowed(direction,this.piece) && !privateMethods.overlappingMove(direction,this.board.board,this.piece)){
       this.piece.deleteEffect();
       this.piece.move(direction);
     }
     if(privateMethods.inGround(this.board.board,this.piece) || privateMethods.blockUnderneath(this.board.board,this.piece)){
       if(this.piece.isFading()){
         this.piece.deleteEffect();
         this.piece.layed=true;
         this.piece.lock(direction);
         this.updateBoardView();
         this.board.checkLines();
         const random = (Math.floor(Math.random() * PieceEnum.enumValues.length-1) + 1);
         var factory = new PieceFactory();
         this.piece = factory.createPiece(PieceEnum.enumValues[random].name);
         if(privateMethods.overlappingMove(false,this.board.board,this.piece)){
           this.board.resetBoard();
         }
       }else{
         this.piece.className = pieceClass;
         this.piece.fadeOut();
       }
     }
     this.updateBoardView();
   };
    this.updatePieceState = function(){
      const pieceClass = this.piece.className;
      this.piece.deleteEffect();
      if(privateMethods.changeAllowed(this.board.board,this.piece)){
        this.piece.changeState();
      }else{
         privateMethods.relocatePieceInsideBoard(this.board.board,this.piece);
      }
      if(privateMethods.inGround(this.board.board,this.piece)){
        this.piece.className = pieceClass;
       this.piece.fadeOut();
      }
      this.updateBoardView();
    }
  }
}

export const privateMethods = {
  refreshBoard(board){
    const refreshedBoard = board.map((row,indexX) => {
      return row.map((cell,indexY) => {
            if((cell instanceof Block) && cell.layed){
              return cell;
            }else{
              return false;
            }
      });
    });
    return refreshedBoard;
  },
  addPiece(board,piece){
      const pieceState = piece.blockRepresentation();

      for ( var i= 0; i <pieceState.length;i++){
        for ( var j= 0; j <pieceState.length;j++){
          if(pieceState[i][j]){
            board[i+piece.y][j+piece.x] = pieceState[i][j];
          }
        }
      }
      return board;
  },
  moveAllowed(direction,piece){
      switch (direction) {
        case LEFT:
          if(piece.x>0-piece.getSpaces(direction,piece.currentState,true)){
            return true;
          }
          break;
        case RIGHT:
          if(piece.x<(BOARD_COLUMNS-4+piece.getSpaces(direction,piece.currentState,true))){
            return true;
          }
          break;
        case DOWN:
          if(piece.y<(BOARD_ROWS-4+piece.getSpaces(direction,piece.currentState,true))){

            return true;
          }
          break;
        default:
          return false;
      }
  },
  changeAllowed(boardRepresentation,piece){

    var nextPiece =  Object.assign({},piece);
    nextPiece.currentState = piece.nextState();
    if(piece.x<BOARD_COLUMNS-4+piece.getSpaces(RIGHT,nextPiece.currentState,true) &&
       (0<piece.x+piece.getSpaces(LEFT,nextPiece.currentState,true)) &&
       (piece.y<BOARD_ROWS-4+piece.getSpaces(DOWN,nextPiece.currentState,true)) &&
       !this.overlappingMove(false,boardRepresentation,nextPiece)){
      return true;
    }
    return false;
  },
  relocatePieceInsideBoard(boardRepresentation,piece){
    const nextState = piece.nextState();
    var pieceTest =  Object.assign({},piece);
    pieceTest.currentState = nextState;
    if(!this.overlappingMove(false,boardRepresentation,pieceTest)){
      if(!(piece.x<(BOARD_COLUMNS-4+piece.getSpaces(RIGHT,nextState,true)))){
        piece.x=piece.x-(piece.x-(BOARD_COLUMNS-4+piece.getSpaces(RIGHT,nextState,true)));
        piece.currentState = nextState;
      }else if(!(0<(piece.x+piece.getSpaces(LEFT,nextState,true)))){
        piece.x=piece.x-(piece.x+piece.getSpaces(LEFT,nextState,true));
        piece.currentState = nextState;
      }
      if(!(piece.y<(BOARD_ROWS-4+piece.getSpaces(DOWN,nextState,true)))){
        piece.y=piece.y-(piece.y-(BOARD_ROWS-4+piece.getSpaces(DOWN,nextState,true)));
        piece.currentState = nextState;
      }
    }else{
      this.relocatePieceAvoidingBlocks(boardRepresentation,piece,nextState);
    }
  },
  inGround(board,piece){
    const currentPieceRealPosition = ((piece.y)+4-piece.getSpaces(DOWN,piece.currentState,true));
    if(currentPieceRealPosition === (BOARD_ROWS)){
      return true;
    }
    return false;
  },
  overlappingMove(direction,boardRepresentation,piece){
    var pieceTest =  Object.assign({},piece);
    var boardTest =  this.refreshBoard(boardRepresentation);
    if(direction){
      pieceTest.move(direction);
    }
    const pieceRepresentation = pieceTest.states[pieceTest.currentState];
    for(var i = 0;i<pieceRepresentation.length;i++){
      for(var j = 0;j<pieceRepresentation[0].length;j++){
        if(pieceRepresentation[i][j] && (((i+pieceTest.y)>(BOARD_ROWS-1)) || boardTest[i+pieceTest.y][j+pieceTest.x] || ((j+pieceTest.x)<0) || ((j+pieceTest.x)>(BOARD_COLUMNS-1)))){
          return true;
        }
      }
    }
    return false;
  },
  blockUnderneath(boardRepresentation,piece){
    const refreshedBoard = this.refreshBoard(boardRepresentation);
    const spaces = piece.getSpaces(DOWN,piece.currentState,false);
    for(var i=0;i<4;i++){
      if(spaces[i]!==piece.states[piece.currentState].length &&
        (piece.y-spaces[i])<(BOARD_ROWS-1) &&
        (refreshedBoard[piece.y+4-spaces[i]][piece.x+i])){
        return true;
      }
    }
    return false;
  },
  relocatePieceAvoidingBlocks(boardRepresentation,piece,state){
    var pieceTest =  Object.assign({},piece);
    pieceTest.currentState = state;
    var i = 0;
    var relocated = false;

    while(i<(piece.getSpaces(LEFT,piece.currentState,true)-pieceTest.getSpaces(LEFT,pieceTest.currentState,true)) && !relocated){
      pieceTest.move(RIGHT);
      relocated = (!this.overlappingMove(false,boardRepresentation,pieceTest) && this.insideTheBoard(boardRepresentation,pieceTest));
      i++;
    }

    if(!relocated){
      pieceTest =  Object.assign({},piece);
      pieceTest.currentState = state;
      i = 0;
      while(i<(piece.getSpaces(RIGHT,piece.currentState,true)-pieceTest.getSpaces(RIGHT,pieceTest.currentState,true)) && !relocated){
        pieceTest.move(LEFT);
        relocated = (!this.overlappingMove(false,boardRepresentation,pieceTest) && this.insideTheBoard(boardRepresentation,pieceTest));
        i++;
      }
    }
    if(!relocated){
      pieceTest =  Object.assign({},piece);
      pieceTest.currentState = state;
      i = 0;
      while(i<(piece.getSpaces(DOWN,piece.currentState,true)-pieceTest.getSpaces(DOWN,pieceTest.currentState,true)) && !relocated){
        pieceTest.y=pieceTest.y-1;
        relocated = (!this.overlappingMove(false,boardRepresentation,pieceTest) && this.insideTheBoard(boardRepresentation,pieceTest));
        i++;
      }
    }
    if(relocated){

      piece.x = pieceTest.x;
      piece.y = pieceTest.y;
      piece.currentState = pieceTest.currentState;
    }

  },
  insideTheBoard(boardRepresentation,piece){
    if(!(piece.x<BOARD_COLUMNS-3+piece.getSpaces(RIGHT,piece.currentState,true)) || !(0<(piece.x+piece.getSpaces(LEFT,piece.currentState,true))) ||
       !(piece.y<(BOARD_ROWS-3+piece.getSpaces(DOWN,piece.currentState,true)))){
          return false;
    }else {
          return true;
    }
  }
}
