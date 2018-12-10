import { userService } from "../services/user.service";

const userToken = localStorage.getItem("token");

export const authentication = {
  namespaced: true,
  state: {
    loggedIn: !!userToken,
    pending: false
  },
  mutations: {
    LOGIN_REQUEST(state) {
      state.pending = true;
    },
    LOGIN_SUCCESS(state) {
      state.pending = false;
      state.loggedIn = true;
    },
    LOGIN_FAIL(state) {
      state.pending = false;
      state.loggedIn = false;
    },
    LOGOUT(state) {
      state.loggedIn = false;
    }
  },
  actions: {
    login({ commit }, { username, password }) {
      return new Promise((resolve, reject) => {
        commit("LOGIN_REQUEST");
        setTimeout(function() {
          userService
            .login(username, password)
            .then(() => {
              commit("LOGIN_SUCCESS");
              resolve();
            })
            .catch(e => {
              commit("LOGIN_FAIL");
              reject(e);
            });
        }, 5000);
      });
    },
    logout({ commit }) {
      userService.logout();
      commit("LOGOUT");
    }
  },
  getters: {
    isLoggedIn: state => {
      return state.loggedIn;
    },
    pending: state => {
      return state.pending;
    }
  }
};
