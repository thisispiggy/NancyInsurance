<template>
  <v-container fluid>
    <v-card max-width="1000px" class="mx-auto">
      <v-card-text>
        <v-select v-model="website" :items="sites" label="Website"></v-select>

        <v-textarea v-model="dates" label="Dates"></v-textarea>

        <v-layout wrap>
          <v-flex xs12 sm6 lg2 v-for="code in cpt" v-bind:key="code.label">
            <v-checkbox v-model="code.checked" :label="code.label"></v-checkbox>
          </v-flex>
        </v-layout>

        <v-layout wrap>
          <v-flex lg12 v-for="code in cpt" v-bind:key="code.label">
            <v-text-field v-model="code.content" :label="code.label" v-if="code.checked"></v-text-field>
          </v-flex>
        </v-layout>

        <v-select v-model="diagnosisCode" :items="diagnosis" label="Diagnosis Code"></v-select>

        <v-btn @click="submit">Generate</v-btn>
        <v-spacer></v-spacer>
        <v-textarea v-model="bScript" disabled></v-textarea>
        <v-btn v-if="btnShow" :href="'javascript: '+bScript">Bookmark</v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Form",
  data: () => ({
    website: "",
    dates: "",
    sites: ["Availity", "OfficeAlly", "United Health Care"],
    diagnosis: [1, 2, 3, 4, 5],
    diagnosisCode: "",
    cpt: [
      {
        label: 99203,
        checked: false,
        content: "25, $65, 1"
      },
      {
        label: 97813,
        checked: false,
        content: "25, $65, 1"
      },
      {
        label: 97814,
        checked: false,
        content: "25, $65, 1"
      },
      {
        label: 99213,
        checked: false,
        content: "25, $65, 1"
      },
      {
        label: 97140,
        checked: false,
        content: "25, $65, 1"
      },
      {
        label: 97124,
        checked: false,
        content: "25, $65, 1"
      }
    ],
    a99203: "25, $65.00, 1",
    a97813: "25, $65.00, 1",
    a97814: "25, $65.00, 1",
    a99213: "25, $65.00, 1",
    a97140: "25, $65.00, 1",
    a97124: "25, $65.00, 1",
    btnShow: false,
    script: "",
    iframe: ""
  }),
  methods: {
    submit() {
      // eslint-disable-next-line no-console
      console.log(this.a99203);
      this.script = "console.log('test')";
      this.generate();
      this.btnShow = true;
    },
    getiFrame() {
      this.iframe = document.getElementById("aspnetForm");
    },
    generate() {
      let initScriptUrl =
        "https://rawgit.com/nfleury/bookmarklet-generator/master/static/bookmarklet-init.js";
      let configString = JSON.stringify({
        website: this.website,
        dates: this.dates,
        diagnosisCode: this.diagnosisCode,
        cpt: this.cpt,
        a99203: this.a99203,
        a97813: this.a97813,
        a97814: this.a97814,
        a99213: this.a99213,
        a97140: this.a97140,
        a97124: this.a97124
      });

      this.bScript = encodeURIComponent(
        `var BOOKMARKLET_CONFIG =${configString};var s = document.createElement("script");s.type = "text/javascript";s.src="${initScriptUrl}";document.body.appendChild(s);`
      );
    }
  }
};
</script>
