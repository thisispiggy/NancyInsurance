function fillLine(month, day, year, line, cptCode) {
  // line html and data
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
      data: cptCode.label,
    },
    {
      html: `[name="procedureModifierA[${line}]"]`,
      data: cptCode.modifier,
    },
    {
      html: `[name="diagnosisCodeA[${line}]"]`,
      data: BOOKMARK.diagnosisCode,
    },
    {
      html: `[name="chargeDollars[${line}]"]`,
      data: cptCode.cost,
    },
    {
      html: `[name="anesthesiaTimeUnits[${line}]"]`,
      data: cptCode.unit,
    },
  ];

  // targets the iframe
  let iframe = document.getElementById("component1_ssoFrame");

  // fills each lineobject
  lineObjects.forEach((object) => {
    // eslint-disable-next-line no-console
    console.log(object, line);
    iframe.contentWindow.document.querySelector(object.html).value =
      object.data;
  });
  BOOKMARK.diagnosisCode.forEach((diagnosisCode) => {
    iframe.contentWindow.document.querySelector(
      `'[name="diagnosisCodeA[${line}]"]'`
    ).value = line;
  });
}

BOOKMARK.fillDate = () => {
  inputDates = BOOKMARK.dates;

  // filters cptcodes to only have checked items
  const cptCodes = BOOKMARK.cpt.filter((item) => item.checked == true);
  const rowNumbers = inputDates.length + cptCodes.length + 1;
  for (let i; i < rowNumbers; i++) {
    HCFALineItemTableManager.AddRows();
  }

  // eslint-disable-next-line no-console
  console.log("dates:" + inputDates);

  let line = 0;

  // reiterates over each date
  inputDates.forEach((date) => {
    let month, day, year;
    [month, day, year] = date.split("/");

    if (line == 0) {
      // filters out 99213 if new patient
      let codes = cptCodes.filter((cptCode) => {
        return cptCode.label != 99213;
      });

      // reiterates for each procedural code
      codes.forEach((cptCode) => {
        // eslint-disable-next-line no-console
        console.log("99203" + cptCode);
        fillLine(month, day, year, line, cptCode);
        line++;
        // eslint-disable-next-line no-console
        console.log(line);
      });
    } else {
      // filters out 99203 if old patient
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
