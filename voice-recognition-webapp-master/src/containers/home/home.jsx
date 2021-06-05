import React from 'react';
import { Link } from 'react-router-dom';

import registerIcon from 'assets/home/register.svg';
import verificationIcon from 'assets/home/verification.svg';
import manageAccountIcon from 'assets/home/manage-account.svg';

export default function Home() {
	return (
		<div className="home-page no-select">
			<div className="web-name">Voice Verification System</div>
			<div className="panel">
				<div className="panel-btn">
					<div className="img-wrap">
						<Link to="/register">
							<img src={registerIcon} alt="register" />
						</Link>
					</div>
					<span>Register</span>
				</div>
				<div className="panel-btn">
					<div className="img-wrap">
						<Link to="/verification">
							<img src={verificationIcon} alt="register" />
						</Link>
					</div>
					<span>Verification</span>
				</div>
				<div className="panel-btn">
					<div className="img-wrap">
						<Link to="/manage-account">
							<img src={manageAccountIcon} alt="register" />
						</Link>
					</div>
					<span>Manage account</span>
				</div>
			</div>
		</div>
	);
}
