// eslint-disable-next-line no-console

BOOKMARK.fillDate = () => {
  inputDates = BOOKMARK.dates.split("\n");
  const cptCodes = BOOKMARK.cpt.filter(item => item.checked == true);
  // eslint-disable-next-line no-console
  console.log(cptCodes);
  let line = 0;
  inputDates.forEach(date => {
    let month, day, year;
    [month, day, year] = date.split("/");
    if (line == 0) {
      cptCodes
        .filter(cptCode => cptCode.label != 99213)
        .forEach(cptCode => {
          fillLine(month, day, year, line, cptCode);
        });
    } else {
      cptCodes
        .filter(cptCode => cptCode.label != 99203)
        .forEach(cptCode => {
          fillLine(month, day, year, line, cptCode);
        });
    }
    cptCodes;

    line++;
  });
};

function fillLine(month, day, year, line, cptCodes) {
  let lineBase =
    "#ctl00_phFolderContent_ucHCFA_ucHCFALineItem_ucClaimLineItem_";

  let lineObjects = [
    {
      html: lineBase + "FM_DATE_OF_SVC_MONTH" + line,
      data: month
    },
    {
      html: lineBase + "FM_DATE_OF_SVC_DAY" + line,
      data: day
    },
    {
      html: lineBase + "FM_DATE_OF_SVC_YEAR" + line,
      data: year
    },
    {
      html: lineBase + "TO_DATE_OF_SVC_MONTH" + line,
      data: month
    },
    {
      html: lineBase + "TO_DATE_OF_SVC_DAY" + line,
      data: day
    },
    {
      html: lineBase + "TO_DATE_OF_SVC_YEAR" + line,
      data: year
    },
    {
      html: lineBase + "PLACE_OF_SVC" + line,
      data: 11
    },
    {
      html: lineBase + "CPT_CODE" + line,
      data: cptCode.label
    },
    {
      html: lineBase + "MODIFIER_A" + line,
      data: cptCode.modifier
    },
    {
      html: lineBase + "DOS_DIAG_CODE" + line,
      data: BOOKMARK.diagnosisCode
    },
    {
      html: lineBase + "DOS_CHRG" + line,
      data: cptCode.cost
    },
    {
      html: lineBase + "UNITS" + line,
      data: cptCode.unit
    }
  ];
  let iframe = document.getElementById("Iframe9");
  lineObjects.forEach(object => {
    // eslint-disable-next-line no-console
    console.log(object);
    iframe.contentWindow.document.querySelector(object.html).value =
      object.data;
  });
  // Object.keys(lineObjects).forEach(item => {
  //   iframe.contentWindow.document.querySelector(item).value = lineObjects[item];
  // });
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
