import React from 'react';
import {BOARD_COLUMNS,BOARD_ROWS} from '../constants/index';
import Block from "../pieces/Block"
export class Board{
  constructor(){
   this.board = privateMethods.generateInitialInternalGameBoard(BOARD_ROWS,BOARD_COLUMNS);
   this.generateInGameTable = function() {
       const board = privateMethods.generateInGameRows(this.board);
       return board;
   };
   this.resetBoard = function(){
     this.board = privateMethods.generateInitialInternalGameBoard(BOARD_ROWS,BOARD_COLUMNS);
   };
   this.updateBoardRepresentation = function (newRepresentation){
     this.board = newRepresentation;
   };
   this.checkLines = function(){
     var linesToBeClear = privateMethods.completedLines(this.board);
     this.board = privateMethods.clearLines(this.board,linesToBeClear);
   };
   this.updateBoardView = function(piece){
    const refreshedboard = privateMethods.refreshBoard(this.board);
    this.updateBoardRepresentation(privateMethods.addPiece(refreshedboard,piece));
  }
  }
}

const privateMethods = {
  generateInitialInternalGameBoard(numRows, numCols){
    const board = this.generateRows(numRows, numCols);
    return board;
  },
  generateRows(numRows, numCols) {
    const rows = [];
    for (var i = 0; i < numRows; i++) {
      const cells = this.generateCells(numCols);
      rows.push(cells);
    }
    return rows;
  },
  generateCells(numCols) {
    const cells = [];
    for (var j = 0; j < numCols; j++) {
      cells.push(false);
    }
    return cells;
  },
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
  // GENERATING THE VISIBLE Board
  generateInGameRows(internalTable) {
    const rows = [];
    for (var i = 0; i < internalTable.length; i++) {
      const rowID = `row${i}`;
      const cells = this.generateInGameCells(i, internalTable[i]);
      rows.push(
        <tr key={rowID} id={rowID}>
          {cells}
        </tr>
      );
    }
    return rows;
  },

  generateInGameCells(assignedRow, row) {
    const cells = [];
    for (var j = 0; j < row.length; j++) {
      const cellID = `cell${assignedRow}-${j}`;
      const classString = `${row[j].selectedClass || "empty-block"}`;
      cells.push(<td key={cellID} id={cellID} className={classString} />);
    }
    return cells;
  },
  completedLines(boardRepresentation){
    var refreshedBoard = this.refreshBoard(boardRepresentation);
    var linesToBeClear = [];
    for(var i=0;i<BOARD_ROWS;i++){
      var j=0;
      var clear = true;
      while(j<BOARD_COLUMNS && clear){
        if(!refreshedBoard[i][j]){
          clear = false;
        }
        j++;
      }
      if(clear){
        linesToBeClear.push(i);
      }
      clear = true;
    }
    return linesToBeClear;
  },
  clearLines(boardRepresentation,linesToBeClear){
    var refreshedBoard = this.refreshBoard(boardRepresentation);
    for(var line in linesToBeClear){
      for(var i=linesToBeClear[line];i>0;i--){
        for(var j=0;j<BOARD_COLUMNS;j++){
          refreshedBoard[i][j]=refreshedBoard[i-1][j];
        }
      }
    }
    return refreshedBoard;
  }

}
