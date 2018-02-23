import {Piece} from './Piece';


class Piece_z extends Piece{
  constructor(){
  super();
  this.states=[
    [
      [0, 0, 0, 0],
      [1, 1, 0, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0]
    ],
    [
      [0, 1, 0, 0],
      [1, 1, 0, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [1, 1, 0, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [0, 0, 1, 0],
      [0, 1, 1, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 0]
    ]
  ];
  this.className= 'piece-z';
   this.changeState= function(){
      const nextState = this.nextState(this.currentState,this.states.length);
        this.currentState=nextState;
   };
   this.deleteEffect= function(){
     this.className = 'piece-z';
   }

  };
}





export default Piece_z;
