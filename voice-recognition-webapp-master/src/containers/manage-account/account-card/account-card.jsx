import React from 'react';

import AvatarImg from 'assets/manage-account/avatar.svg';

export default function AccountCard({ account, focus, setFocus, ...props }) {
	return (
		<div
			className={`account-card ${focus ? 'on-select' : ''}`}
			onClick={() => {
				setFocus(account.id);
			}}
            {...props}
		>
			<img className="avatar" src={AvatarImg} alt="avatar" />
			<div className="details">
				<span className="name">{account.name}</span>
			</div>
		</div>
	);
}
