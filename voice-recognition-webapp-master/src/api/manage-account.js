/* eslint-disable */
const { httpGet } = require('./sender/sender');

function getAccounts() {
	const route = `/get-accounts`;
  console.log(httpGet(route))
	return httpGet(route);
}

function deleteAccount(param) {
    return Promise.resolve({
		success: true
	});
}

function deleteAllAccount() {
	return Promise.resolve({
		success: true
	});
}


export default {
  getAll: getAccounts,
	delete: deleteAccount,
	deleteAll: deleteAllAccount
}