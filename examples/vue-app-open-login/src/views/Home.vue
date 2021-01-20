<template>
  <div class="home">
    <h2>Open Login Demo Application</h2>
    <div :style="{ marginTop: '50px' }">
      <button @click="login">Login with Google</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { triggerLogin } from "../OpenLoginSdk";

export default {
  name: "Home",
  methods: {
    async login() {
      await triggerLogin();
    }
  }
};
</script>
