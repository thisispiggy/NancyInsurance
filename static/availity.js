// // eslint-disable-next-line no-undef
let { website, dates, diagnosisCode, cpt } = BOOKMARK;

// eslint-disable-next-line no-undef
let iframe = document.getElementById("newBodyFrame");

//Function for filling line
// eslint-disable-next-line no-undef
let fillLine = (month, day, year, cpt) => {
  let lineBase =
    "componentListPanel:componentListView:30:component:claimLineForm:componentListPanel:componentListView:0:component:";
  let lineObjects = [
    {
      html: "fromToDateContainer:fromDate:month",
      data: month
    },
    {
      html: "fromToDateContainer:fromDate:day",
      data: day
    },
    {
      html: "fromToDateContainer:fromDate:year",
      data: year
    },
    {
      html: "fromToDateContainer:toDate:month",
      data: month
    },
    {
      html: "fromToDateContainer:toDate:day",
      data: day
    },
    {
      html: "fromToDateContainer:toDate:year",
      data: year
    },
    {
      html: "servicePlaceContainer:servicePlace",
      data: "11"
    },
    {
      html: "procedureCodeContainer:procedureCode",
      data: cpt.label
    },
    {
      html: "modifier1Container:modifier1",
      data: cpt.modifier
    },
    {
      html: "chargesContainer:charges",
      data: cpt.cost
    },
    {
      html: "numberContainer:number",
      data: cpt.unit
    }
  ];

  let lineDiagnosis = [
    {
      html: "diagnosisCodePointer1Container:diagnosisCodePointer1",
      data: "1"
    },
    {
      html: "diagnosisCodePointer1Container:diagnosisCodePointer2",
      data: "2"
    },
    {
      html: "diagnosisCodePointer1Container:diagnosisCodePointer3",
      data: "3"
    },
    {
      html: "diagnosisCodePointer1Container:diagnosisCodePointer4",
      data: "3"
    }
  ];

  //fill everything besides diagnosis code
  lineObjects.forEach(object => {
    object.html = lineBase + object.html;

    iframe.contentWindow.document.getElementsByName(object.html)[0].value =
      object.data;
  });

  //fill the diagnosis code
  lineDiagnosis.forEach(object => {
    object.html = lineBase + object.html;

    iframe.contentWindow.document.getElementsByName(
      object.html
    )[0].selectedIndex = object.data;
  });

  //clicks save serve line
  setTimeout(() => {
    iframe.contentWindow.document.getElementById("saveServiceLine").click();
  }, 2000);
};

//function to iterate each cpt code
let iterCpt = (month, day, year, cpts) => {
  cpts.forEach((cpt, index) => {
    setTimeout(fillLine(month, day, year, cpt), 3000 * (index + 1));
  });
};

//filters cpt code to only have list of 99203
let filter99203 = BOOKMARK.cpt.filter(cpt => cpt.label == 99203);

//Function to iterate each date
let fillDate = () => {
  let line = 0;
  BOOKMARK.dates.forEach(date => {
    let [month, day, year] = date.split("/");
    let cptChecked = cpt.filter(item => item.checked == true);
    // fillLine(month, day, year, cpt[0]);

    //if first line and 99203 checked, filter out 99213, else filter out 99203
    if (line == 0 && filter99203[0].checked) {
      let codes = cptChecked.filter(item => item.label != 99213);
      iterCpt(month, day, year, codes);
    } else {
      let codes = cptChecked.filter(item => item.label != 99203);
      iterCpt(month, day, year, codes);
    }
  });
};

if (BOOKMARK) {
  let s = document.createElement("script");
  s.type = "text/javascript";
  //   let code = BOOKMARK.fillDate;
  try {
    s.appendChild(document.createTextNode(fillDate));
    document.body.appendChild(s);
    fillDate();
  } catch (e) {
    s.text = fillDate;
    document.body.appendChild(s);
  }
}
