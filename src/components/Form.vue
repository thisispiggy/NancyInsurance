<template>
  <v-container fluid>
    <v-card max-width="1000px" class="mx-auto">
      <v-card-text>
        <v-select v-model="website" :items="sites" label="Website"></v-select>

        <!-- <v-textarea v-model="dates" label="Dates"></v-textarea> -->

        <template v-slot:activator="{ on }">
          <v-text-field v-model="dates" v-on="on"></v-text-field>
        </template>

        <v-date-picker v-model="dates" full-width landscape multiple color="grey darken-4"></v-date-picker>

        <v-layout wrap>
          <v-flex xs12 sm6 lg2 v-for="code in cpt" v-bind:key="code.label">
            <v-checkbox v-model="code.checked" :label="code.label"></v-checkbox>
          </v-flex>
        </v-layout>

        <v-layout wrap>
          <v-flex xs12 sm2 v-for="code in cpt" v-bind:key="code.label" outlined>
            <v-text-field
              v-model="code.modifier"
              label="Modifier"
              v-if="code.checked"
              class="mr-3 my-0"
              outlined
            ></v-text-field>
            <v-text-field
              v-model="code.cost"
              label="Cost in $"
              v-if="code.checked"
              class="mr-3 my-0"
              outlined
            ></v-text-field>
            <v-text-field
              v-model="code.unit"
              label="Units"
              v-if="code.checked"
              class="mr-3"
              outlined
            ></v-text-field>
          </v-flex>
        </v-layout>

        <v-select v-model="diagnosisCode" :items="diagnosis" label="Diagnosis Code"></v-select>

        <v-btn @click="submit" depressed>Generate</v-btn>
        <v-spacer></v-spacer>
        <v-textarea v-model="bScript" disabled></v-textarea>
        <v-btn v-if="btnShow" :href="'javascript: ' + bScript" depressed>Bookmark</v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Form",
  data() {
    return {
      website: "",
      dates: [],
      test: "",
      sites: ["Availity", "OfficeAlly", "United Health Care"],
      diagnosis: [1, 2, 3, 4, 5],
      diagnosisCode: "",
      cpt: [
        {
          label: 99203,
          checked: false,
          modifier: "25",
          cost: "75",
          unit: "1"
        },
        {
          label: 99213,
          checked: false,
          modifier: "25",
          cost: "55",
          unit: "1"
        },
        {
          label: 97813,
          checked: false,
          modifier: "",
          cost: "85",
          unit: "1"
        },
        {
          label: 97814,
          checked: false,
          modifier: "",
          cost: "210",
          unit: "3"
        },
        {
          label: 97026,
          checked: false,
          modifier: "GP",
          cost: "60",
          unit: "4"
        },
        {
          label: 97124,
          checked: false,
          modifier: "GP",
          cost: "50",
          unit: "1"
        }
      ],
      btnShow: false,
      script: "",
      iframe: ""
    };
  },
  methods: {
    submit() {
      // eslint-disable-next-line no-console
      console.log(this.a99203);
      this.script = "console.log('test')";
      this.generate();
      this.btnShow = true;
    },
    addField() {
      this.test.push("fdsst");
    },
    // getiFrame() {
    //   this.iframe = document.getElementById("aspnetForm");
    // },
    generate() {
      let initScriptUrl;
      switch (this.website) {
        case "Availity":
          initScriptUrl =
            "https://thisispiggy.github.io/NancyInsurance/js/availity.js";
          break;
        case "OfficeAlly":
          initScriptUrl =
            "https://thisispiggy.github.io/NancyInsurance/js/officeally.js";
          break;
        default:
          initScriptUrl =
            "https://thisispiggy.github.io/NancyInsurance/js/united.js";
          break;
      }

      let configString = JSON.stringify({
        website: this.website,
        dates: this.dates,
        diagnosisCode: this.diagnosisCode,
        cpt: this.cpt
      });

      this.bScript = encodeURIComponent(
        `var BOOKMARK =${configString};var s = document.createElement("script");s.type = "text/javascript";s.src="${initScriptUrl}";document.body.appendChild(s);`
      );
    }
  }
};
</script>

<style scoped>
.main {
  display: flex;
  align-items: center;
  justify-content: center;
}

.content {
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 0 30px rgba(128, 128, 128, 0.1);
  flex-basis: 40%;
}
</style>
