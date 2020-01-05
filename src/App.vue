<template>
  <v-app>
    <v-content>
      <Form />
    </v-content>
  </v-app>
</template>

<script>
import Form from "./components/Form";

export default {
  name: "App",

  components: {
    Form
  },

  data: () => ({
    //
  })
};
</script>
