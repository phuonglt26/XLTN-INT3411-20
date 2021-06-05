import React from 'react';


import checkIcon from 'assets/register/check-icon.svg';
import wrongIcon from 'assets/register/wrong-icon.svg';
import { Link } from 'react-router-dom';
import { LoopCircleLoading } from 'react-loadingg';
export default function DoneStage({ finalState, cos }) {

  let _renderIcon = <span>Loading</span>;
  if(finalState === true) {
    _renderIcon = <img className="stage-icon" src={checkIcon} alt="check-icon"/>
  } else if(finalState === false) {
    _renderIcon =  <img className="stage-icon" src={wrongIcon} alt="check-icon"/>
  }

  return (
    <div className="done-stage">
        {_renderIcon}
        <span className="done-message">{finalState === null ? <LoopCircleLoading/> : (finalState=== true ? "Done" : "Wrong")}</span>
        <Link to="/">
            <span className="button">Return home</span>
        </Link>
    </div>
  );
}
