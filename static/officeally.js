// eslint-disable-next-line no-console
console.log(BOOKMARK);

BOOKMARK.fillDate = () => {
  inputDates = BOOKMARK.dates.split("\n");
  inputDates.forEach(date => {
    let line = 0;
    let month, day, year;
    [month, day, year] = date.split("/");
    fillLine(month, day, year, line);
  });
};

function fillLine(month, day, year, line) {
  let lineBase =
    "#ctl00_phFolderContent_ucHCFA_ucHCFALineItem_ucClaimLineItem_";
  let fromMonth = lineBase + "FM_DATE_OF_SVC_MONTH" + line;
  let fromDay = lineBase + "FM_DATE_OF_SVC_DAY" + line;
  let fromYear = lineBase + "FM_DATE_OF_SVC_YEAR" + line;
  let toMonth = lineBase + "TO_DATE_OF_SVC_MONTH" + line;
  let toDay = lineBase + "TO_DATE_OF_SVC_DAY" + line;
  let toYear = lineBase + "TO_DATE_OF_SVC_YEAR" + line;
  let place = lineBase + "PLACE_OF_SVC" + line;
  let lineObjects = {
    fromMonth: month,
    fromDay: day,
    fromYear: year,
    toMonth: month,
    toDay: day,
    toYear: year,
    place: 11
  };
  let iframe = document.getElementById("Iframe9");
  let iframe2 = iframe.contentWindow.document.getElementById("aspnetForm");
  Object.keys(lineObjects).forEach(item => {
    iframe.contentWindow.document.querySelector(item).value = lineObjects[item];
  });
}

// ctl00_phFolderContent_ucHCFA_ucHCFALineItem_ucClaimLineItem_EMG0;
// ctl00_phFolderContent_ucHCFA_ucHCFALineItem_ucClaimLineItem_CPT_CODE0;
// ctl00_phFolderContent_ucHCFA_ucHCFALineItem_ucClaimLineItem_MODIFIER_A0;
// ctl00_phFolderContent_ucHCFA_ucHCFALineItem_ucClaimLineItem_DOS_DIAG_CODE0;
// ctl00_phFolderContent_ucHCFA_ucHCFALineItem_ucClaimLineItem_DOS_CHRG0;
// ctl00_phFolderContent_ucHCFA_ucHCFALineItem_ucClaimLineItem_UNITS0;
// iframe.contentWindow.document.querySelector('#ctl00_phFolderContent_ucHCFA_ucHCFALineItem_ucClaimLineItem_FM_DATE_OF_SVC_MONTH').value = lineObjects[item];

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
