import React, { Component } from "react";
import key from 'keymaster';
import "../css/index.css";
import "../css/animate.css";
import { connect } from "react-redux";
import {movePiece,changeState} from '../actions/index';
import { LEFT,RIGHT,DOWN } from '../constants/index';
class Board extends Component {


  componentWillMount() {
      key("left",()=>{this.props.onKeyPressed(LEFT)});
      key("right",()=>{this.props.onKeyPressed(RIGHT)});
      key("down",()=>{this.props.onKeyPressed(DOWN)});
      key("up",this.props.onUpKeyPressed);
      global.setInterval(() => {
        this.props.onKeyPressed(DOWN);
      }, 1000);
  }
  render() {

    return (
      <div>
        <table>
         <tbody>
          {this.props.board.board.generateInGameTable()}
         </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps({ board }) {
  return {board} ;
}

function mapDispatchToProps (dispatch) {
  return {
    onKeyPressed: (direction) => {
      dispatch(movePiece(direction));
    },
    onUpKeyPressed: () =>{
      dispatch(changeState())
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Board);
