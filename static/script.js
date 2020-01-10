// load main script if available

console.log(BOOKMARK);

if (BOOKMARK.script) {
  let s = document.createElement("script");
  s.type = "text/javascript";
  let code = BOOKMARK.script;
  try {
    s.appendChild(document.createTextNode(code));
    document.body.appendChild(s);
  } catch (e) {
    s.text = code;
    document.body.appendChild(s);
  }
}
