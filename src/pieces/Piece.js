import {DOWN, RIGHT, LEFT} from '../constants/index';
import Block from "../pieces/Block";

export class Piece {
  constructor(){
    this.currentState=0;
    this.states=null;
    this.x=4;
    this.y=0;
    this.layed=false;
    this.className=null;
  this.move= function(direction){
        switch (direction) {
          case LEFT:
          this.x--;
          break;
          case RIGHT:
          this.x++;
          break;
          case DOWN:
          this.y++;
          break;
          default:
          throw new Error("Invalid move");
        }
   };
   this.nextState= function(){
     if(this.currentState===3){
       return 0;
     }else{
       return (this.currentState+1);
     }
   };
   this.lock= function(){
     this.layed = true;
   };
   this.fadeOut = function() {
     if(this.className.includes("fadeOut2")){
        this.className = this.className.replace('fadeOut2','fadeOut');
     }
     else if(this.className.includes("fadeOut")){
        this.className = this.className.replace("fadeOut","fadeOut2");
     }else{
       this.className =this.className+" animated fadeOut";
     }
   };
   this.deleteEffect = function() {
      if(this.className.includes("fadeOut2")){
           this.className = this.className.replace("fadeOut2","");
      }
      else if(this.className.includes("fadeOut")){
           this.className = this.className.replace("fadeOut","");
      }
   };
   this.isFading = function() {
     return (this.className.includes("fadeOut"));
   };
   this.getSpaces = function(side,state,max){
     const arraySpaces = [];
     var x=privateMethods.xOrigin(side,this.states[state]);
     var y=privateMethods.yOrigin(side,this.states[state]);
     var spaces= 0;
     var finalSpacesValue = null;
     while(privateMethods.inBoardMainIterationCondition(side,x,y,this.states[state])){
       while(privateMethods.inBoardSubIterationCondition(side,x,y,this.states[state]) && !this.states[state][x][y]){
         spaces++;
         x=privateMethods.updateXForSubIteration(x,side);
         y=privateMethods.updateYForSubIteration(y,side);
       }
       if(finalSpacesValue==null || finalSpacesValue>spaces){
         finalSpacesValue=spaces;
       }
       arraySpaces.push(spaces);
       spaces=0;
       x=privateMethods.updateXForMainIteration(x,side,this.states[state]);
       y=privateMethods.updateYForMainIteration(y,side,this.states[state]);
     }
     if(max){
       return finalSpacesValue;
     }else{
       return arraySpaces;
     }
   };
   this.blockRepresentation = function(){
     const block = this.states[this.currentState].map(row =>{
       return (row.map(cell =>{
         if(cell){
           return (new Block(this.className,this.layed));
         }else{
           return cell;
         }
       }));
     });
     return block;
   }
  }
}

const privateMethods = {
  xOrigin(side,representation){
    switch (side) {
      case LEFT:
      case RIGHT:
        return 0;
      case DOWN:
        return (representation.length-1);
      default:
        throw new Error("Invalid side");
    }
  },
  yOrigin(side,representation) {
    switch (side) {
      case LEFT:
      case DOWN:
        return 0;
      case RIGHT:
        return (representation[0].length-1);
      default:
      throw new Error("Invalid side");
    }
  },
  inBoardMainIterationCondition(side,x,y,representation){
    switch (side) {
      case LEFT:
      case RIGHT:
        return (x<representation.length);
      case DOWN:
        return (y<representation[0].length);
      default:
        throw new Error("Invalid side");
    }
  },
  inBoardSubIterationCondition(side,x,y,representation){
    switch (side) {
      case LEFT:
        return (y<representation[0].length);
      case RIGHT:
        return (y>=0);
      case DOWN:
        return (x>=0);
      default:
        throw new Error("Invalid side");
    }},
    updateXForSubIteration(x,side){
      switch (side) {
        case DOWN:
          return (x-1);
        default:
          return x;

      }
    },
    updateYForSubIteration(y,side){
      switch (side) {
        case LEFT:
          return (y+1);
        case RIGHT:
          return (y-1);
        default:
          return y;
      }
    },
    updateXForMainIteration(x,side,representation){
      switch (side) {
        case LEFT:
        case RIGHT:
          return (x+1);
        case DOWN:
          return (this.xOrigin(side,representation));
        default:
          return x;
      }
    },
    updateYForMainIteration(y,side,representation){
      switch (side) {
        case DOWN:
          return (y+1);
        case LEFT:
        case RIGHT:
          return (this.yOrigin(side,representation));
        default:
          return y;
      }

    }
  }
