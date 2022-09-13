<template>
  <div id="app" style="background-color: #f0ffff">
    <div class="content">
      <div class="container w-75 p-5 rounded-top">
        <div class="row">
          <div class="col-md-6 order-md-2">
            <img
              src="../assets/undraw_file_sync_ot38.svg"
              alt="Image"
              class="img-fluid"
            />
          </div>
          <div class="col-md-6 contents">
            <div class="row justify-content-center">
              <div class="col-md-8">
                <div class="mb-4">
                  <h3>Sign In to <strong>Employee Desk</strong></h3>
                </div>
                <div v-if="errorMessage">
                  <span style="color: red"> {{ errorMessage }} </span>
                </div>
                <login-form @responseMessage="responseMessage" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import Vue from "vue";
import "bootstrap/dist/css/bootstrap.css";
import "../assets/css/loginPage.css";
import { setStateFromLocal } from "../helpers/authHelper";

export default Vue.extend({
  name: "PagesLogin",
  
  data() {
    return {
      errorMessage: null,
    };
  },

  beforeMount(): void {
    const response = setStateFromLocal(this.$store);
    if (response) {
      this.$router.push("/dashboard");
    }
  },

  methods: {
    responseMessage(message: string): void {
      this.errorMessage = message;
      setTimeout(() => {
        this.errorMessage = null;
      }, 2000);
    },
  },
});
</script>
