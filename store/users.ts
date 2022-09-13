import axios from "axios";
import { UserInfoDocument } from "interfaces/users.interface";

import type { ActionTree, GetterTree, MutationTree } from "vuex";

export const state = (): any => ({
  userDoc: [] as UserInfoDocument[],
});

export type RootState = ReturnType<typeof state>;

export const getters: GetterTree<RootState, RootState> = {
  usersInfos(state) {
    return state.userDoc;
  },
};

export const mutations: MutationTree<RootState> = {
  ALL_USERS(state, userData) {
    state.userDoc = userData;
  },

  ADD_USER(state, userInfo) {
    state.userDoc = [...new Set([userInfo].concat(state.userDoc))];
  },

  REMOVE_USER(state, id) {
    state.userDoc = state.userDoc.filter(
      (userInfo: UserInfoDocument) => userInfo.id !== id
    );
  },

  UPDATE_USER(state, userData: UserInfoDocument){
    const users: UserInfoDocument[] = state.userDoc;
    state.userDoc = users.map((user: UserInfoDocument)=> {
      if(user.id === userData.id){
        user = userData
      }
      return user
    });
  },
};

export const actions: ActionTree<RootState, RootState> = {
  async getAllUsers({ state, commit }): Promise<UserInfoDocument[]> {
    try {
      const { apiURL, token } = (this as any).$config;
      if (state.userDoc && state.userDoc.length) {
        return Promise.resolve(state.userDoc);
      }
      const usersSnap = await axios.get(`${apiURL}users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (usersSnap.status !== 200) {
        console.error(
          "API error or missing data - Error code :",
          usersSnap.status
        );
        return Promise.resolve([]);
      }
      commit("ALL_USERS", usersSnap.data);
      return Promise.resolve(usersSnap.data);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async addUser({ commit }, form) {
    try {
      const { apiURL, token } = (this as any).$config;
      const userDoc: UserInfoDocument = {
        name: form.name,
        gender: form.gender,
        email: form.email,
        status: form.status,
      };
      const usersSnap = await axios.post(`${apiURL}users`, userDoc, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (usersSnap.status !== 201) {
        console.error("API error or missing data - Error code :", usersSnap.status );
        return Promise.resolve([]);
      }
      commit("ADD_USER", usersSnap.data);
      return Promise.resolve(usersSnap.data);
    } catch (error) {}
  },

  async removeUser({ commit }, id): Promise<void> {
    const { apiURL, token } = (this as any).$config;
    await axios.delete(`${apiURL}users/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    commit("REMOVE_USER", id);
  },

  async updateUser({ commit }, userData: UserInfoDocument): Promise<UserInfoDocument> {
    const { apiURL, token } = (this as any).$config;
    const { id } = userData;
    await axios.put(`${apiURL}users/${id}`, userData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    commit("UPDATE_USER", userData);
    return userData;
  },
};
