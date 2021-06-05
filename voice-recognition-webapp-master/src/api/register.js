/* eslint-disable */
const { httpPost } = require("./sender/sender");
import FormData from 'form-data';
import fs from 'fs';

function register(payload) {
    const route = "/register";
    return httpPost(route, payload);
}

async function checkLength(payload) {
    const route = "/register/check-length";
    const formdata = new FormData();

    formdata.append('file', payload.file.blob, "register.wav");
    return httpPost(route, formdata, undefined, "mutipart/form-data");
}

export default {
  checkLength,
  post: register,
}

