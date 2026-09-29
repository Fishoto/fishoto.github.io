(function () {
  var root = document.documentElement;
  var key = "fishoto.lang";

  function stored() {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }

  function preferred() {
    var saved = stored();
    if (saved === "pl" || saved === "en") return saved;
    var languages = navigator.languages || [navigator.language || ""];
    for (var i = 0; i < languages.length; i++) {
      var code = String(languages[i]).toLowerCase().slice(0, 2);
      if (code === "pl" || code === "en") return code;
    }
    return "en";
  }

  function apply(lang) {
    root.lang = lang;
    document.title = root.getAttribute("data-title-" + lang) || document.title;
  }

  apply(preferred());

  document.addEventListener("DOMContentLoaded", function () {
    var button = document.querySelector(".lang");
    if (!button) return;
    button.hidden = false;
    button.addEventListener("click", function () {
      var next = root.lang === "pl" ? "en" : "pl";
      apply(next);
      try { localStorage.setItem(key, next); } catch (e) {}
    });
  });
})();
