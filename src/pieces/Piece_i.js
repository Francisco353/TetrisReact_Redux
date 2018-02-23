import {Piece} from './Piece';

class Piece_i extends Piece{
  constructor(){
  super();
  this.states=[
    [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0]
  ]
    ,
    [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0]
    ],
  [
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0]
  ]

];
  this.className= 'piece-i';
   this.changeState= function(){
      const nextState = this.nextState(this.currentState,this.states.length);
        this.currentState=nextState;
   };
   this.deleteEffect= function(){
     this.className = 'piece-i';
   }

  };
}





export default Piece_i;
