(function () {
  var root = document.documentElement;
  var key = "fishoto.lang";
  var supported = ["en", "pl", "de"];

  function stored() {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }

  function preferred() {
    var saved = stored();
    if (supported.indexOf(saved) !== -1) return saved;
    var languages = navigator.languages || [navigator.language || ""];
    for (var i = 0; i < languages.length; i++) {
      var code = String(languages[i]).toLowerCase().slice(0, 2);
      if (supported.indexOf(code) !== -1) return code;
    }
    return "en";
  }

  function apply(lang) {
    root.lang = lang;
    document.title = root.getAttribute("data-title-" + lang) || document.title;
  }

  apply(preferred());

  document.addEventListener("DOMContentLoaded", function () {
    var switcher = document.querySelector(".lang");
    if (!switcher) return;
    switcher.hidden = false;
    switcher.addEventListener("click", function (event) {
      var button = event.target.closest("[data-set]");
      if (!button) return;
      var next = button.getAttribute("data-set");
      apply(next);
      try { localStorage.setItem(key, next); } catch (e) {}
    });
  });
})();
