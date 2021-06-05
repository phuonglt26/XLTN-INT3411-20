import React from 'react';


import checkIcon from 'assets/register/check-icon.svg';
import { Link } from 'react-router-dom';

export default function DoneStage() {
  return (
    <div className="done-stage">
        <img className="stage-icon" src={checkIcon} alt="check-icon"/>
        <span className="done-message">Done</span>
        <Link to="/">
            <span className="button">Return home</span>
        </Link>
    </div>
  );
}
