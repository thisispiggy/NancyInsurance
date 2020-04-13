function fillLine(month, day, year, line, cptCode) {
  let lineBase =
    "#ctl00_phFolderContent_ucHCFA_ucHCFALineItem_ucClaimLineItem_";

  let lineObjects = [
    {
      html: lineBase + "FM_DATE_OF_SVC_MONTH" + line,
      data: month,
    },
    {
      html: lineBase + "FM_DATE_OF_SVC_DAY" + line,
      data: day,
    },
    {
      html: lineBase + "FM_DATE_OF_SVC_YEAR" + line,
      data: year,
    },
    {
      html: lineBase + "TO_DATE_OF_SVC_MONTH" + line,
      data: month,
    },
    {
      html: lineBase + "TO_DATE_OF_SVC_DAY" + line,
      data: day,
    },
    {
      html: lineBase + "TO_DATE_OF_SVC_YEAR" + line,
      data: year,
    },
    {
      html: lineBase + "PLACE_OF_SVC" + line,
      data: 11,
    },
    {
      html: lineBase + "CPT_CODE" + line,
      data: cptCode.label,
    },
    {
      html: lineBase + "MODIFIER_A" + line,
      data: cptCode.modifier,
    },
    {
      html: lineBase + "DOS_DIAG_CODE" + line,
      data: BOOKMARK.diagnosisCode,
    },
    {
      html: lineBase + "DOS_CHRG" + line,
      data: cptCode.cost,
    },
    {
      html: lineBase + "UNITS" + line,
      data: cptCode.unit,
    },
  ];
  let iframe = document.getElementById("Iframe9");
  lineObjects.forEach((object) => {
    // eslint-disable-next-line no-console
    console.log(object);
    iframe.contentWindow.document.querySelector(object.html).value =
      object.data;
  });
  // Object.keys(lineObjects).forEach(item => {
  //   iframe.contentWindow.document.querySelector(item).value = lineObjects[item];
  // });
}

BOOKMARK.fillDate = () => {
  // inputDates = BOOKMARK.dates.split("\n");
  inputDates = BOOKMARK.dates;
  const cptCodes = BOOKMARK.cpt.filter((item) => item.checked == true);
  const rowNumbers = inputDates.length + cptCodes.length + 1;
  for (let i; i < rowNumbers; i++) {
    HCFALineItemTableManager.AddRows();
  }

  const letters = {
    1: "A",
    2: "AB",
    3: "ABC",
    4: "ABCD",
    5: "ABCDE",
    6: "ABCDEF",
  };

  BOOKMARK.diagnosisCode = letters[BOOKMARK.diagnosisCode];
  // eslint-disable-next-line no-console
  console.log("dates:" + inputDates);
  // eslint-disable-next-line no-console
  console.log("all codes:" + cptCodes);

  let line = 0;
  inputDates.forEach((date) => {
    let month, day, year;
    [month, day, year] = date.split("/");

    if (line == 0) {
      let codes = cptCodes.filter((cptCode) => {
        return cptCode.label != 99213;
      });
      codes.forEach((cptCode) => {
        // eslint-disable-next-line no-console
        // console.log("99203" + cptCode);
        fillLine(month, day, year, line, cptCode);
        line++;
        // eslint-disable-next-line no-console
        console.log(line);
      });
    } else {
      let codes = cptCodes.filter((cptCode) => {
        return cptCode.label != 99203;
      });

      codes.forEach((cptCode) => {
        // eslint-disable-next-line no-console
        console.log("99213" + cptCode);
        fillLine(month, day, year, line, cptCode);
        line++;
        // eslint-disable-next-line no-console
        console.log(line);
      });
    }
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
