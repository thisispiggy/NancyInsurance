// // eslint-disable-next-line no-undef
// const { website, dates, diagnosisCode, cpt } = BOOKMARK;

// eslint-disable-next-line no-undef
iframe = document.getElementById("newBodyFrame");

//Function for filling each line for each date
// eslint-disable-next-line no-undef
fillLine = (month, day, year, cpt) => {
  const lineBase =
    "componentListPanel:componentListView:31:component:claimLineForm:componentListPanel:componentListView:0:component:";
  const lineObjects = [
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
      html: "diagnosisCodePointer1Container:diagnosisCodePointer1",
      data: diagnosisCode
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
  });
};

//function to iterate each cpt code
iterCpt = (month, day, year, cpts) => {
  cpts.forEach(cpt => {
    fillLine(month, day, year, cpt);
  });
};

//filters cpt code to only have list of 99203
filter99203 = BOOKMARK.cpt.filter(cpt => cpt.label == 99203);

//Function for each date
fillDate = () => {
  BOOKMARK.dates.forEach(date => {
    let [month, day, year] = date.split("/");
    // eslint-disable-next-line no-console
    console.log(BOOKMARK.cpt);
    fillLine(month, day, year, BOOKMARK.cpt);

    // let line = 0;

    // if first line and 99203 checked, filter out 99213, else filter out 99203
    /*
    if (line == 0 && filter99203[0].checked) {
      const codes = cpt.filter(cpt => cpt.label !== 99213);
      iterCpt(month, day, year, codes);
    } else {
      const codes = cpt.filter(cpt => cpt.label !== 99203);
      iterCpt(month, day, year, cpt);
    }
    */
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
