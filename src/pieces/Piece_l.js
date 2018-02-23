import {Piece} from './Piece';


class Piece_l extends Piece{
  constructor(){
  super();
  this.states=[
    [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0]
    ],
    [
      [0, 0, 0, 0],
      [1, 1, 1, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [1, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [0, 0, 1, 0],
      [1, 1, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]
  ];
  this.className= 'piece-l';
   this.changeState= function(){
      const nextState = this.nextState(this.currentState,this.states.length);
        this.currentState=nextState;
   };
   this.deleteEffect= function(){
     this.className = 'piece-l';
   }

  };
}





export default Piece_l;
