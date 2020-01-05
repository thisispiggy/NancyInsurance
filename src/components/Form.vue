<template>
  <v-container fluid>
    <v-text-field name="99203" label="99203" v-model="a99203"></v-text-field>
    <v-text-field name="97813" label="97813" v-model="a97813"></v-text-field>
    <v-text-field name="97814" label="97814" v-model="a97814"></v-text-field>
    <v-text-field name="97140" label="97140" v-model="a97140"></v-text-field>
    <v-text-field name="97026" label="97026" v-model="a97026"></v-text-field>
    <v-text-field name="97124" label="97124" v-model="a97124"></v-text-field>
    <v-btn @click="submit">Submit</v-btn>
    <v-spacer></v-spacer>
    <v-btn v-if="btnShow" :href="link.test">Bookmark</v-btn>
    <v-btn>OfficeAlly</v-btn>
  </v-container>
</template>

<script>
export default {
  name: "Form",
  data: () => ({
    a99203: "25, $65.00, 1",
    a97813: "25, $65.00, 1",
    a97814: "25, $65.00, 1",
    a99213: "25, $65.00, 1",
    a97140: "25, $65.00, 1",
    a97124: "25, $65.00, 1",
    btnShow: false,
    link: "",
    iframe: ""
  }),
  methods: {
    submit() {
      // eslint-disable-next-line no-console
      console.log(this.a99203);
      this.btnShow = true;
      this.link = {
        test: "javascript: (() => {console.log(" + this.a99203 + ")})()"
      };
      this.link = JSON.stringify(this.link);
    },
    getiFrame() {
      this.iframe = document.getElementById("aspnetForm");
    }
  }
};
</script>
