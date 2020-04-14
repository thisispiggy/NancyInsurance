// // eslint-disable-next-line no-undef
({ website, dates, diagnosisCode, cpt } = BOOKMARK);

// eslint-disable-next-line no-undef
iframe = document.getElementById("newBodyFrame");

//Function for filling each line for each date
// eslint-disable-next-line no-undef
fillLine = (month, day, year, cpt) => {
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

  lineObjects.forEach(object => {
    object.html = lineBase + object.html;

    iframe.contentWindow.document.getElementsByName(object.html)[0].value =
      object.data;

    document.getElementById(
      lineBase + "diagnosisCodePointer1Container:diagnosisCodePointer1"
    ).selectedIndex = "1";
    document.getElementById(
      lineBase + "diagnosisCodePointer1Container:diagnosisCodePointer2"
    ).selectedIndex = "2";
    document.getElementById(
      lineBase + "diagnosisCodePointer1Container:diagnosisCodePointer3"
    ).selectedIndex = "3";
    document.getElementById(
      lineBase + "diagnosisCodePointer1Container:diagnosisCodePointer4"
    ).selectedIndex = "4";

    setTimeout(() => {
      iframe.contentWindow.document.getElementById("saveServiceLine").click();
    }, 2000);
  });
};

//function to iterate each cpt code
iterCpt = function(month, day, year, cpts) {
  cpts.forEach(cpt => {
    // eslint-disable-next-line no-console
    console.log(cpt);
    fillLine(month, day, year, cpt);
  });
};

//filters cpt code to only have list of 99203
filter99203 = BOOKMARK.cpt.filter(cpt => cpt.label == 99203);

//Function for each date
fillDate = () => {
  let line = 0;
  BOOKMARK.dates.forEach(date => {
    let [month, day, year] = date.split("/");

    // if first line and 99203 checked, filter out 99213, else filter out 99203
    if (line == 0 && filter99203[0].checked) {
      let codes = cpt.filter(item => item.label != 99213);
      iterCpt(month, day, year, codes);
    } else {
      let codes = cpt.filter(item => item.label != 99203);
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
