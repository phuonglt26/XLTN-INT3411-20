import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = '/api';

/**
 *  {
 *    success: true/ fasle
 *    data: {
 *      }
 *    reason: "string" // toast log leen mh nếu succes = false
 *    warning: "string" // toát log nếu succ = true
 * }
 * 
 */

function handleResponse(res) {
	if (!res.data) {
		return Promise.reject('Something went wrong');
	} else {
		if (res.data.success) {
			if (res.data.warning) {
				// toast
				toast.warn(res.data.warning);
			}
			return Promise.resolve(res.data.data);
		} else {
			return Promise.reject(res.data.reason);
		}
	}
}

export function httpGet(route, params, token) {
	let url = `${API_BASE_URL}${route}`;
	const headers = token ? { token } : undefined;
	return axios.get(url, { headers, params }).then(handleResponse);
}

export function httpPost(route, payload, token, contentType) {
	let url = `${API_BASE_URL}${route}`;
	let headers = token ? { token } : undefined;
  if(contentType) {
    if(headers === undefined) {
      headers = {};
    } 
    headers['Content-Type'] = contentType
  }
	return axios.post(url, payload, { headers }).then(handleResponse);
}

export function httpPut(route, payload, token) {
	let url = `${API_BASE_URL}${route}`;
	const headers = token ? { token } : undefined;
	return axios.put(url, payload, { headers }).then(handleResponse);
}

export function httpDelete(route, payload, token) {}
