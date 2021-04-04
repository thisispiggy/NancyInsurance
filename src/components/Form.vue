<template>
  <section class="section main">
    <div class="card content">
      <div class="field">
        <label class="label">1. Select Website</label>
        <div class="control has-icons-left">
          <div class="select is-primary">
            <select placeholder="Select" v-model="website">
              <option v-for="site in sites" v-bind:key="site">
                {{
                site
                }}
              </option>
            </select>
          </div>
          <div class="icon is-left">
            <i class="fas fa-bookmark"></i>
          </div>
        </div>
      </div>

      <div class="cpt-code">
        <div class="field formattedDate">
          <label class="label">Dates</label>
          <div class="control">
            <div v-for="date in formattedDate" v-bind:key="date">{{ date }}</div>
          </div>
        </div>

        <div class="calendar">
          <div class="field">
            <label class="label">2. Select Dates</label>
            <div class="control">
              <b-datepicker :date-formatter="dobFormatter" v-model="dates" multiple inline></b-datepicker>
            </div>
          </div>
        </div>
      </div>

      <div class="cpt-container">
        <label class="label">3. Select Modifiers</label>
        <div class="cpt-code" v-for="code in cpt" v-bind:key="code.label">
          <div class="field">
            <label class="checkbox">
              <div class="control">
                <input type="checkbox" v-model="code.checked" />
                {{ code.label }}
              </div>
            </label>
          </div>

          <div class="code-input-container" v-if="code.checked">
            <div class="field code-input">
              <label class="label">
                Modifier
                <div class="control">
                  <input class="input" v-model="code.modifier" type="text" />
                </div>
              </label>
            </div>

            <div class="field code-input" v-if="code.checked">
              <label class="label">
                Cost
                <div class="control">
                  <input class="input" v-model="code.cost" type="text" />
                </div>
              </label>
            </div>

            <div class="field code-input" v-if="code.checked">
              <label class="label">
                Unit
                <div class="control">
                  <input class="input" v-model="code.unit" type="text" />
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="label">4. Select Diagnosis Codes</label>
        <div class="control has-icons-left">
          <div class="select is-primary">
            <select placeholder="Select" v-model="diagnosisCode">
              <option v-for="number in diagnosis" v-bind:key="number">
                {{
                number
                }}
              </option>
            </select>
          </div>
          <div class="icon is-left">
            <i class="fas fa-sort-numeric-down"></i>
          </div>
        </div>
      </div>

      <button @click="submit" class="button is-primary">Submit</button>
      <a v-if="btnShow" :href="'javascript: ' + bScript">Bookmark</a>
    </div>
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
      sites: ["Availity", "OfficeAlly", "MyVaCCN", "United Health Care"],
      diagnosis: [1, 2, 3, 4, 5],
      diagnosisCode: "",
      cpt: [
        {
          label: 99203,
          checked: false,
          modifier: "25",
          cost: "75",
          unit: "1",
        },
        {
          label: 99213,
          checked: false,
          modifier: "25",
          cost: "55",
          unit: "1",
        },
        {
          label: 97813,
          checked: false,
          modifier: "",
          cost: "75",
          unit: "1",
        },
        {
          label: 97814,
          checked: false,
          modifier: "",
          cost: "120",
          unit: "2",
        },
        {
          label: 97026,
          checked: false,
          modifier: "GP",
          cost: "10",
          unit: "1",
        },
        {
          label: 97139,
          checked: false,
          modifier: "GP",
          cost: "40",
          unit: "1",
        },
        {
          label: 97140,
          checked: false,
          modifier: "GP",
          cost: "60",
          unit: "2",
        },
      ],
      btnShow: false,
      script: "",
      iframe: "",
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
    generate() {
      let initScriptUrl;
      switch (this.website) {
        case "Availity":
          initScriptUrl =
            "https://kangruixiang.github.io/NancyInsurance/js/availity.js";
          break;
        case "OfficeAlly":
          initScriptUrl =
            "https://kangruixiang.github.io/NancyInsurance/js/officeally.js";
          break;
        case "MyVaCCN":
          initScriptUrl =
            "https://kangruixiang.github.io/NancyInsurance/js/myvaccn.js";
          break;
        default:
          initScriptUrl =
            "https://kangruixiang.github.io/NancyInsurance/js/united.js";
          break;
      }

      let configString = JSON.stringify({
        website: this.website,
        dates: this.formattedDate,
        diagnosisCode: this.diagnosisCode,
        cpt: this.cpt,
      });

      this.bScript = encodeURIComponent(
        `var BOOKMARK =${configString};var s = document.createElement("script");s.type = "text/javascript";s.src="${initScriptUrl}";document.body.appendChild(s);`
      );
    },
    dobFormatter(dt) {
      let moment = require("moment");
      let result = new Array();
      dt.forEach((dt) => {
        let date2 = moment(dt).format("MM/DD/YYYY");
        result.push(date2);
      });
      // eslint-disable-next-line no-console
      // console.log(result);

      return result;
    },
  },
  computed: {
    formattedDate: function () {
      let moment = require("moment");

      let result = new Array();
      this.dates.forEach((date) => {
        let date2 = moment(date).format("MM/DD/YYYY");
        result.push(date2);
      });
      return result;
    },
  },
};
</script>

<style scoped>
::selection {
  background-color: #d4f9ec;
}

.main {
  height: 100%;
  display: flex;
  background-color: rgb(189, 218, 211);
  /* align-items: center;
  justify-content: center; */
}

.content {
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  box-shadow: 0 0 30px rgba(128, 128, 128, 0.1);
  /* flex-basis: 50%; */
  margin: auto;
  min-height: 550px;
  min-width: 870px;
  display: flex;
  flex-direction: column;
  padding: 2em;
  box-sizing: border-box;
}

.cpt-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-bottom: 1em;
}

.cpt-code {
  display: flex;
  flex: 1;
}

.code-input-container {
  margin-left: 2em;
  display: flex;
}

.formattedDate {
  order: 2;
  margin-left: 2em;
}

.calendar {
  order: 1;
  margin-bottom: 2em;
}
</style>
