<template>
  <v-app>
    <v-content>
      <Test />
    </v-content>
  </v-app>
</template>

<script>
import Test from "./components/Test";

export default {
  name: "App",

  components: {
    Test
  },

  data: () => ({
    //
  })
};
</script>

<style>
@import "https://use.fontawesome.com/releases/v5.2.0/css/all.css";
@import "https://cdn.materialdesignicons.com/2.5.94/css/materialdesignicons.min.css";
@import "./scss/style.css";
</style>
