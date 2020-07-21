/* eslint-disable no-console */
// eslint-disable-next-line no-undef

// eslint-disable-next-line no-unused-vars
let { website, dates, diagnosisCode, cpt } = BOOKMARK;
let filter99203 = cpt.filter((cpt) => cpt.label == 99203); // filters cpt code to only have 99203 for later use
let cptChecked = cpt.filter((item) => item.checked == true); // filters checked cpt only
let line = 0;

// function for sleep
let sleep = (time) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

// function to run async sleep
let timeOut = async (ms) => {
  await sleep(ms);
  console.log("slept for: ", ms);
};

//function to fill the page
let fillLine = async (month, day, year, cpt) => {
  let lineObjects = [
    {
      html: `[name="fromDateOfServiceMonth[${line}]"]`,
      data: month,
    },
    {
      html: `[name="fromDateOfServiceDay[${line}]"]`,
      data: day,
    },
    {
      html: `[name="fromDateOfServiceYear[${line}]"]`,
      data: year,
    },
    {
      html: `[name="toDateOfServiceMonth[${line}]"]`,
      data: month,
    },
    {
      html: `[name="toDateOfServiceDay[${line}]"]`,
      data: day,
    },
    {
      html: `[name="toDateOfServiceYear[${line}]"]`,
      data: year,
    },
    {
      html: `[name="procedureCode[${line}]"]`,
      data: cpt.label,
    },
    {
      html: `[name="procedureModifierA[${line}]"]`,
      data: cpt.modifier,
    },
    {
      html: `[name="chargeDollars[${line}]"]`,
      data: cpt.cost,
    },
    {
      html: `[name="anesthesiaTimeUnits[${line}]"]`,
      data: cpt.unit,
    },
  ];

  let lineDiagnosis = [
    {
      html: "diagnosisCodePointer1Container:diagnosisCodePointer1",
      data: "1",
    },
    {
      html: "diagnosisCodePointer1Container:diagnosisCodePointer2",
      data: "2",
    },
    {
      html: "diagnosisCodePointer1Container:diagnosisCodePointer3",
      data: "3",
    },
    {
      html: "diagnosisCodePointer1Container:diagnosisCodePointer4",
      data: "4",
    },
  ];

  // targets page's iframe
  let iframe = document.getElementById("component1_ssoFrame");

  //fill everything besides diagnosis code
  lineObjects.forEach((object) => {
    iframe.contentWindow.document.querySelector(object.html).value =
      object.data;
  });

  // fill the place of service
  iframe.contentWindow.document.querySelector(
    `[name="placeOfService[${line}]"]`
  ).selectedIndex = 10;

  //fill the diagnosis code
  // lineDiagnosis.forEach((object) => {
  //   iframe.contentWindow.document.getElementsByName(
  //     object.html
  //   )[0].selectedIndex = object.data;
  // });
  line++;
  await timeOut(1000);
  return new Promise((resolve) => resolve("Finished fillLine", line, cpt));
};

//function to iterate each cpt code
let iterCpt = async (month, day, year, cpts) => {
  for (const cpt of cpts) {
    let result = await fillLine(month, day, year, cpt);
    console.log(result);
  }
  return new Promise((resolve) => {
    resolve("Finished iterCpt", month, day);
  });
};

//Function to iterate each date
let fillDate = async () => {
  for (const date of dates) {
    let [month, day, year] = date.split("/");

    if (line == 0 && filter99203[0].checked) {
      let codes = cptChecked.filter((item) => item.label != 99213);
      let result = await iterCpt(month, day, year, codes);
      console.log(line, result);
    } else {
      let codes = cptChecked.filter((item) => item.label != 99203);
      let result = await iterCpt(month, day, year, codes);
      console.log(line, result);
    }
  }
  alert("Finished filling insurance");
};

if (BOOKMARK) {
  let s = document.createElement("script");
  s.type = "text/javascript";
  try {
    s.appendChild(document.createTextNode(fillDate));
    document.body.appendChild(s);
    fillDate();
  } catch (e) {
    s.text = fillDate;
    document.body.appendChild(s);
  }
}
