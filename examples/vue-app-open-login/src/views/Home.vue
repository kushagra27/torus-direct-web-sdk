<template>
  <div class="home">
    <h2>Open Login Demo Application</h2>
    <div :style="{ marginTop: '50px' }">
      <button v-if="!privKey" @click="login">Login with Google</button>
      <div v-if="privKey">Login successful</div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { triggerLogin } from "../OpenLoginSdk";

export default {
  name: "Home",
  data() {
    return { privKey: "" }
  },
  mounted() {
    const hash = this.$route.hash.slice(1);
    const { privKey } = hash.split("&").reduce((result, item) => {
    const [part0, part1] = item.split("=");
    result[part0] = part1;
    return result;
  }, {});
  this.privKey = privKey
  },
  methods: {
    async login() {
      await triggerLogin();
    }
  }
};
</script>
