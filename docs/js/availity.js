const iframe = document.getElementById("newBodyFrame");

const lineBase =
  "componentListPanel:componentListView:31:component:claimLineForm:componentListPanel:componentListView:0:component:";
const lineObjects = [
  {
    html: "fromToDateContainer:fromDate:month",
    data: "10",
  },
  {
    html: "fromToDateContainer:fromDate:day",
    data: "25",
  },
  {
    html: "fromToDateContainer:fromDate:year",
    data: "2020",
  },
  {
    html: "fromToDateContainer:toDate:month",
    data: "10",
  },
  {
    html: "fromToDateContainer:toDate:day",
    data: "25",
  },
  {
    html: "fromToDateContainer:toDate:year",
    data: "2020",
  },
  {
    html: "servicePlaceContainer:servicePlace",
    data: "11",
  },
  {
    html: "procedureCodeContainer:procedureCode",
    data: "99203",
  },
  {
    html: "modifier1Container:modifier1",
    data: "",
  },
  {
    html: "diagnosisCodePointer1Container:diagnosisCodePointer1",
    data: "",
  },
  {
    html: "chargesContainer:charges",
    data: "50",
  },
  {
    html: "numberContainer:number",
    data: "1",
  },
];

BOOKMARK.fillDate = function () {
  lineObjects.forEach((object) => {
    object.html = lineBase + object.html;
    iframe.contentWindow.document.getElementsByName(object.html)[0].value =
      object.data;
  });
};

if (BOOKMARK) {
  let s = document.createElement("script");
  s.type = "text/javascript";
  //   let code = BOOKMARK.fillDate;
  try {
    s.appendChild(document.createTextNode(BOOKMARK.fillDate));
    document.body.appendChild(s);
    BOOKMARK.fillDate();
  } catch (e) {
    s.text = BOOKMARK.fillDate;
    document.body.appendChild(s);
  }
}
