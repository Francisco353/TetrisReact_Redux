import {Piece} from './Piece';


class Piece_o extends Piece{
  constructor(){
  super();
  this.states=[
    [
      [1, 1, 0, 0],
      [1, 1, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [1, 1, 0, 0],
      [1, 1, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [1, 1, 0, 0],
      [1, 1, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [1, 1, 0, 0],
      [1, 1, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]
  ];
  this.className= 'piece-o';
   this.changeState= function(){
      const nextState = this.nextState(this.currentState,this.states.length);
        this.currentState=nextState;
   };
   this.deleteEffect= function(){
     this.className = 'piece-o';
   }

  };
}





export default Piece_o;
