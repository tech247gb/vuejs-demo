<template>
  <div>
    <form @submit.prevent="userLogin">
			<!-- username -->
      <div class="form-group first text-left">
        <label for="username">Username : </label>
        <input
          type="text"
          v-model="form.userName"
          placeholder="eg: user149"
          class="form-control"
          id="username"
        />
      </div>
			<!-- password -->
      <div class="form-group last mb-4 text-left">
        <label class="w-100 d-block" for="password">Password : </label>
        <input
          type="password"
          v-model="form.password"
          placeholder="Password"
          class="form-control"
          id="password"
        />
      </div>
			<!-- Forget Password -->
      <!-- <div class="d-flex mb-5 align-items-center">
        <label class="control control--checkbox mb-0"
          ><span class="caption">Remember me</span>
          <input type="checkbox" checked="checked" />
          <div class="control__indicator"></div>
        </label>
        <span class="ml-auto"
          ><a href="#" class="forgot-pass">Forgot Password</a></span
        >
      </div> -->
      <input
				v-if="loaderState !== 'running'"
        type="submit"
        value="Log In"
        class="btn text-white btn-block btn-primary"
      >
			<div v-if="loaderState === 'running'" class="btn text-white btn-block btn-primary">
				<app-spinner style="margin-left: 45%;" />
			</div>
      <span class="d-block text-left my-4 text-muted">
        or
        <nuxt-link to="/signup" class="font-bold text-lg"> Sign Up </nuxt-link>
      </span>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import "../assets/css/spinner.css";

export default Vue.extend({
  name: "LoginForm",

  data() {
    return {
      form: {
        userName: null,
        password: null,
      },
			loaderState: null
    };
  },
  methods: {
    async userLogin(): Promise<void> {
      try {
				if(!this.form.userName || !this.form.password){
					this.$emit("responseMessage", 'Username and password is required');
          return;
				}
				this.loaderState = 'running';
        const response = await this.$store.dispatch("login", this.form);
        if (response === "Success") {
					this.loaderState = 'done';
          this.$router.push("/dashboard");
        } else if (response !== "Success") {
					this.loaderState = 'done';
          this.$emit("responseMessage", response);
          return;
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
});
</script>
