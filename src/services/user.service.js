const APIRoute = "/api/";

import axios from "axios";

export const userService = {
  login,
  logout
};

function login(username, password) {
  // return a promise, so we can use it better
  return new Promise((resolve, reject) => {
    // send a request to api server ( /api/login ) with credentials
    axios
      .post(APIRoute + "login", { username: username, password: password })
      .then(response => {
        // request was successful, save the received token in localStorage
        localStorage.setItem("token", response.data.token);
        // return success (token and username)
        resolve({
          token: response.data.token,
          username: response.data.username
        });
      })
      .catch(e => {
        // something went wrong (i.e. no connection, wrong username, ...)
        reject(e);
      });
  });
}

function logout() {
  // easy function, we just remove the token from the local storage
  localStorage.removeItem("token");
}
