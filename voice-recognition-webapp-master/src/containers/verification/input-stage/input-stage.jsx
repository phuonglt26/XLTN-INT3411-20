import React from 'react';

import profileIcon from 'assets/register/profile-icon.svg';
import { toast } from 'react-toastify';

export default function InputStage({ name, setName, submit, stage }) {

    const _handleClick = () => {
        if(name.length === 0) {
            toast.warning("Name must not be empty.");
        } else {
                stage.next()
        }
    }
    const _onSubmit = (e) => {
      e.preventDefault();
      _handleClick();
    }
	return (
		<form onSubmit={_onSubmit} className="input-stage">
			<img className="stage-icon" src={profileIcon} alt="record-icon" />
			<input
				value={name}
				onChange={e => setName(e.target.value)}
				type="text"
				placeholder="Click to type your name"
			/>
			<span className="button" onClick={_handleClick}>Type your name</span>
		</form>
	);
}
