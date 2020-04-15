/* eslint-disable no-console */
// targets page's iframe
// eslint-disable-next-line no-undef
let iframe = document.getElementById("newBodyFrame");
// eslint-disable-next-line no-unused-vars
let { website, dates, diagnosisCode, cpt } = BOOKMARK;
// filters cpt code to only have list of 99203 and checked cpt
let filter99203 = cpt.filter((cpt) => cpt.label == 99203);
let cptChecked = cpt.filter((item) => item.checked == true);

let sleep = (time) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

//function to fill the page
let fillLine = async (month, day, year, cpt) => {
  let lineBase =
    "componentListPanel:componentListView:30:component:claimLineForm:componentListPanel:componentListView:0:component:";
  let lineObjects = [
    {
      html: "fromToDateContainer:fromDate:month",
      data: month,
    },
    {
      html: "fromToDateContainer:fromDate:day",
      data: day,
    },
    {
      html: "fromToDateContainer:fromDate:year",
      data: year,
    },
    {
      html: "fromToDateContainer:toDate:month",
      data: month,
    },
    {
      html: "fromToDateContainer:toDate:day",
      data: day,
    },
    {
      html: "fromToDateContainer:toDate:year",
      data: year,
    },
    {
      html: "servicePlaceContainer:servicePlace",
      data: "11",
    },
    {
      html: "procedureCodeContainer:procedureCode",
      data: cpt.label,
    },
    {
      html: "modifier1Container:modifier1",
      data: cpt.modifier,
    },
    {
      html: "chargesContainer:charges",
      data: cpt.cost,
    },
    {
      html: "numberContainer:number",
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
      data: "3",
    },
  ];

  //fill everything besides diagnosis code
  lineObjects.forEach((object) => {
    object.html = lineBase + object.html;

    iframe.contentWindow.document.getElementsByName(object.html)[0].value =
      object.data;
  });

  //fill the diagnosis code
  lineDiagnosis.forEach((object) => {
    object.html = lineBase + object.html;

    iframe.contentWindow.document.getElementsByName(
      object.html
    )[0].selectedIndex = object.data;
  });

  await sleep(1000);

  //clicks save serve line
  // setTimeout(() => {
  //   iframe.contentWindow.document.getElementById("saveServiceLine").click();
  // }, 1000);

  iframe.contentWindow.document.getElementById("saveServiceLine").click();
};

//function to iterate each cpt code
let iterCpt = async (month, day, year, cpts) => {
  for (let j = 0; j < cpts.length; j++) {
    await fillLine(month, day, year, cpts[j]);
  }
  return new Promise((resolve) => {
    resolve("Finished cpt");
  });
};

//Function to iterate each date
let fillDate = async () => {
  for (let i = 0; i < dates.length; i++) {
    let [month, day, year] = dates[i].split("/");

    if (i == 0 && filter99203[0].checked) {
      let codes = cptChecked.filter((item) => item.label != 99213);
      let result = await iterCpt(month, day, year, codes);
      console.log(result);
    } else {
      let codes = cptChecked.filter((item) => item.label != 99203);
      let result = await iterCpt(month, day, year, codes);
      console.log(result);
    }
  }
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
