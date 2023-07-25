import { defineStore } from "pinia";
import axios from "axios";
import router from "../router/index";

export const useLoginStore = defineStore("loginStore", {
  state: () => ({
    user: {
      phone: "9876543210",
      password: "tailor@123"
    },
    user_id:localStorage.getItem("user_id"),
    loading: false,
    accessToken: localStorage.getItem("token"),
    errors: {}
  }),

  getters: {
    getAccessToken: (state) => state.accessToken
  },
  mutations: {},
  actions: {
    async login() {
      this.loading = true;
      try {
        const response = await axios.post("tailor/login", this.user);
        this.user_id = response.data.data.user.id;
        localStorage.setItem("user_id", response.data.data.user.id);
        this.setToken(response.data.data.token);

        if (response.data.data.token) {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.data.token;
        }
      } catch (error) {
        if (error.response) {
          this.errors = error.response.data.errors;
        }
        this.loading = false;
      }
    },
    async logout() {
      try {
        const response = await axios.post("tailor/logout");
      } catch (error) {
        if (error.response) {
          this.errors = error.response.data.errors;
        }
      }
    },

    setToken: function (token) {
      this.accessToken = token;
      localStorage.setItem("token", token);
    
      this.errors = {};
      this.user.phone = null;
      this.user.password = null;
      this.loading = false;
      router.push({ name: "dashboard" });
    },
    removeToken: function () {
      this.logout();
      this.accessToken = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      router.push({ name: "login" });
    },
    resetForm: function () {
      this.errors = {};
      this.user.phone = null;
      this.user.password = null;
      this.loading = false;
    }
  }
});
