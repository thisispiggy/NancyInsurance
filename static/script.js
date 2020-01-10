// load main script if available
if (BOOKMARKLET_CONFIG.script) {
  let s = document.createElement("script");
  s.type = "text/javascript";
  let code = BOOKMARKLET_CONFIG.script;
  try {
    s.appendChild(document.createTextNode(code));
    document.body.appendChild(s);
  } catch (e) {
    s.text = code;
    document.body.appendChild(s);
  }
}
