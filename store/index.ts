import axios from "axios";

import type { ActionTree, GetterTree, MutationTree } from "vuex";

interface AuthStateEvent {
  status: string | null;
  token: string | null;
  user: string | null;
}

export const state = (): AuthStateEvent => ({
  status: null as null | string,
  token: null as null | string,
  user: null as null | string,
});

export type RootState = ReturnType<typeof state>;

export const getters: GetterTree<RootState, RootState> = {
  isUserAuthenticated: (state: AuthStateEvent) => {
    return { token: state.token, user: state.user };
  },
};

export const mutations: MutationTree<RootState> = {
  AUTHENTICATED(state:  AuthStateEvent, payload) {
    const { token, user } = payload;
    state.status = "success";
    state.token = token;
    state.user = user;
  },
  LOGOUT(state: AuthStateEvent) {
    state.user = null;
    state.token = null;
    state.status = null;
  },
};

export const actions: ActionTree<RootState, RootState> = {
  async login({ commit }, user) {
    try {
      const { authAPI } = (this as any).$config;
      const authUserSnap = await axios.get(`${authAPI}authUser`);
      const isAuth = authUserSnap.data.filter(
        (userData: any) =>
          userData.userName === user.userName &&
          userData.password === user.password
      );
      if (isAuth && isAuth.length) {
        const { token, userName } = isAuth[0];
        localStorage.setItem("userToken", token);
        localStorage.setItem("userName", userName);
        commit("AUTHENTICATED", { token, user: userName });
        return "Success";
      } else {
        return "Wrong User Name and password";
      }
    } catch (error) {
      console.log(error);
    }
  },

  async signup(context, user): Promise<boolean> {
    try {
      const { authAPI } = (this as any).$config;
      const authUserSnap = await axios.post(`${authAPI}authUser`, user);
      if(authUserSnap.status !== 201){
        return Promise.resolve(false);
      }
      return Promise.resolve(true);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  },

  async logout({ commit }): Promise<boolean> {
    try {
      if( localStorage.getItem("userToken")){
        localStorage.removeItem("userToken");
      }
      if(localStorage.getItem("userName")){
        localStorage.removeItem("userName");
      }
      commit("LOGOUT");
      return Promise.resolve(true);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  },
};
