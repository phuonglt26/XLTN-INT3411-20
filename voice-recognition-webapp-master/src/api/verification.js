/* eslint-disable */

import { httpPost } from "./sender/sender";

const verification = function(payload) {
  const route = "/verification";
  return httpPost(route, payload);
}

export default {
    post: verification
}

