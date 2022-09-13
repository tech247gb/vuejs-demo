<template>
  <div />
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "index",

  middleware: "auth",

  mounted() {
    this.$router.push("login");
  },
});
</script>
