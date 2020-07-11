function fillLine(month, day, year, line, cptCode) {
  let lineBase = "#";

  let lineObjects = [
    {
      html: `fromDateOfServiceMonth[${line}]`,
      data: month,
    },
    {
      html: `fromDateOfServiceDay[${line}]`,
      data: day,
    },
    {
      html: `fromDateOfServiceYear[${line}]`,
      data: year,
    },
    {
      html: `toDateOfServiceMonth[${line}]`,
      data: month,
    },
    {
      html: `toDateOfServiceDay[${line}]`,
      data: day,
    },
    {
      html: `toDateOfServiceYear[${line}]`,
      data: year,
    },
    {
      html: `procedureCode[${line}]`,
      data: cptCode.label,
    },
    {
      html: `procedureModifierA[${line}]`,
      data: cptCode.modifier,
    },
    {
      html: `diagnosisCodeA[${line}]`,
      data: BOOKMARK.diagnosisCode,
    },
    {
      html: `chargeDollars[${line}]`,
      data: cptCode.cost,
    },
    {
      html: `anesthesiaTimeUnits[${line}]`,
      data: cptCode.unit,
    },
  ];
  let iframe = document.getElementById("component1_ssoFrame");
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
