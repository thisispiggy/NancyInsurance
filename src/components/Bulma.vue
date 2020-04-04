<template>
  <section class="section main">
    <div class="content"></div>
    <div class="card content">
      <div class="container">
        <b-field label="Website">
          <b-select v-model="website">
            <option value="availity">Availity</option>
            <option value="officeally">OfficeAlly</option>
            <option value="united">United Health Care</option>
          </b-select>
        </b-field>

        <b-field label="Select a date">
          <b-datepicker placeholder="Click to select..." multiple></b-datepicker>
        </b-field>

        <b-field>
          <div v-for="code in cpt" v-bind:key="code.label">
            <b-checkbox v-model="code.checked">{{ code.label }}</b-checkbox>
          </div>
        </b-field>

        <b-field>
          <div v-for="code in cpt" v-bind:key="code.label" style="display:flex">
            <div>
              <b-input v-model="code.modifier" v-if="code.checked"></b-input>
              <b-input v-model="code.cost" v-if="code.checked"></b-input>
              <b-input v-model="code.unit" v-if="code.checked"></b-input>
              <b-input v-model="code.modifier" v-if="code.checked"></b-input>
            </div>
          </div>
        </b-field>

        <b-field label="Diagnosis Code">
          <b-select v-model="diagnosisCode">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </b-select>
        </b-field>

        <div class="field">
          <div class="control">
            <b-button @click="clickMe" class="is-primary">Submit</b-button>
          </div>
        </div>
      </div>
    </div>

    <div class="content"></div>
  </section>
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
          cost: "65",
          unit: "1"
        },
        {
          label: 99213,
          checked: false,
          modifier: "25",
          cost: "45",
          unit: "1"
        },
        {
          label: 97813,
          checked: false,
          modifier: "",
          cost: "75",
          unit: "1"
        },
        {
          label: 97814,
          checked: false,
          modifier: "",
          cost: "180",
          unit: "3"
        },
        {
          label: 97140,
          checked: false,
          modifier: "GP",
          cost: "60",
          unit: "4"
        },
        {
          label: 97124,
          checked: false,
          modifier: "GP",
          cost: "60",
          unit: "2"
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
