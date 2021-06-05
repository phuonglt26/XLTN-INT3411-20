import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';

import ManageAccountApi from 'api/manage-account';
import AccountCard from './account-card/account-card';

import trashIcon from 'assets/manage-account/trash-icon.svg';
import homeIcon from 'assets/manage-account/home.svg';

export default function ManageAccount() {
	const [accounts, setAccounts] = useState([]);
	const [focus, setFocus] = useState(null)
  const history = useHistory();
	useEffect(() => {
		_fetch();
	}, [])
  console.log(accounts)
	const _fetch = () => {
		ManageAccountApi.getAll().then(data => {
      console.log(data)
			setAccounts(data.result);
			setFocus(null);
		}).catch(err => {
			toast.error(err)
		})
	}

	const _delete = () => {
		if(focus !== null) {
			ManageAccountApi.delete(focus).then(result => {
				_fetch()
			}).catch(err => {
				toast.error(err);
			});
		}
	}
	const _deleteAll = () => {
		if(focus !== null) {
			ManageAccountApi.deleteAll().then(result => {
				_fetch();
			}).catch(err => {
				toast.error(err);
			});
		}
	}
  const _returnHome = () =>{
    history.push("/");
  }
	return (
		<div className="manage-account-page default-background no-select">
			<div className="wrap-content">
				<PerfectScrollbar>
					{accounts.map(acc => (
						<AccountCard
							key={acc.id}
							setFocus={setFocus}
							focus={focus === acc.id}
							account={acc}
						/>
					))}
				</PerfectScrollbar>
				<div className="button-box">
					<span className="button" onClick={_delete}>
						<img src={trashIcon} alt="trash-icon" />
						Delete
					</span>
					<span className="button" onClick={_deleteAll}>
						<img src={trashIcon} alt="trash-icon"/>
						Delete all
					</span>
          <span className="button" onClick={_returnHome}>
						<img src={homeIcon} alt="home-icon"style={{fill: "white"}}/>
						Return
					</span>
				</div>
			</div>
		</div>
	);
}
