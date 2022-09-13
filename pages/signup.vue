<template>
  <div class="vh-100" style="background-color: #f0ffff">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-lg-12 col-xl-11">
          <div class="text-black" style="border-radius: 25px">
            <div class="p-md-5" style="background-color: #f0ffff;">
              <div class="row justify-content-center">
                <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                  <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                    Sign up
                  </p>
                  <p v-if="errorMessage" style="color: red">
                    {{ errorMessage }}
                  </p>
                  <form class="mx-1 mx-md-4" @submit.prevent="handleSignUp">
                    <!-- Name -->
                    <div class="form-group first text-left">
                      <label for="name">Your Name : </label>
                      <input
                        type="text"
                        placeholder="eg: John Doe"
                        class="form-control"
                        id="name"
                      />
                    </div>
                    <!-- userName -->
                    <div class="form-group first text-left">
                      <label for="name">User Name : </label>
                      <input
                        type="text"
                        v-model="form.userName"
                        placeholder="eg: john345"
                        class="form-control"
                        id="name"
                      />
                    </div>
                    <!-- Password -->
                    <div class="form-group last mb-4 text-left">
                      <label class="w-100 d-block" for="password"
                        >Password :
                      </label>
                      <input
                        type="password"
                        v-model="form.password"
                        placeholder="Password"
                        class="form-control"
                        id="password"
                      />
                    </div>
                    <!-- Repeat -->
                    <div class="form-group first text-left">
                      <label for="repeat">Confirm Password : </label>
                      <input
                        type="password"
                        v-model="form.repeatPassword"
                        placeholder="Confirm Password"
                        class="form-control"
                        id="repeat"
                      />
                    </div>
                    <input
                      v-if="loaderState !== 'running'"
                      type="submit"
                      value="Sign Up"
                      class="btn text-white btn-block btn-primary"
                    />
                    <div
                      v-if="loaderState === 'running'"
                      class="btn text-white btn-block btn-primary"
                    >
                      <app-spinner style="margin-left: 45%" />
                    </div>
                    <span class="d-block text-left my-4 text-muted">
                      Already have an account?
                      <nuxt-link to="/login" class="font-bold text-lg">
                        Login
                      </nuxt-link>
                    </span>
                  </form>
                </div>
                <div
                  class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2"
                >
                  <img
                    style="width: 500px;"
                    src="../assets/undraw_file_sync_ot38.svg"
                    alt="Image"
                    class="img-fluid"
                  />
                </div>
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
import "bootstrap/dist/css/bootstrap.min.css";

export default Vue.extend({
  name: "PagesSignup",
  data() {
    return {
      form: {
        userName: null,
        password: null,
        repeatPassword: null,
      },
      errorMessage: null,
      loaderState: null
    };
  },

  middleware: "auth",

  methods: {
    async handleSignUp(): Promise<void> {
      this.loaderState = 'running';
      if (this.form.password !== this.form.repeatPassword) {
        this.loaderState = 'done';
        this.errorMessage = "Password Mismatch";
        setTimeout(() => {
          this.errorMessage = null;
        }, 2000);
        return;
      }
      const { userName, password } = this.form;
      const response = await this.$store.dispatch("signup", {
        userName,
        password,
      });
      this.loaderState = 'done';
      if (response) {
        this.$router.push("/login");
      }
    },
  },
});
</script>
