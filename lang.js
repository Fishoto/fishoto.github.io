(function () {
  var root = document.documentElement;
  var key = "fishoto.lang";
  var supported = ["en", "pl", "de", "sv", "nb", "da", "fi", "ru"];
  var aliases = { no: "nb", nn: "nb" };
  var visibility = document.createElement("style");

  function stored() {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }

  function preferred() {
    var saved = stored();
    if (supported.indexOf(saved) !== -1) return saved;
    var languages = navigator.languages || [navigator.language || ""];
    for (var i = 0; i < languages.length; i++) {
      var code = String(languages[i]).toLowerCase().slice(0, 2);
      code = aliases[code] || code;
      if (supported.indexOf(code) !== -1) return code;
    }
    return "en";
  }

  function name(code) {
    try {
      var native = new Intl.DisplayNames([code], { type: "language" }).of(code);
      return native.charAt(0).toLocaleUpperCase(code) + native.slice(1);
    } catch (e) {
      return code.toUpperCase();
    }
  }

  function apply(lang) {
    root.lang = lang;
    visibility.textContent = '[data-lang]:not([data-lang="' + lang + '"]) { display: none; }';
    document.title = root.getAttribute("data-title-" + lang) || document.title;
  }

  root.classList.add("js");
  document.head.appendChild(visibility);
  apply(preferred());

  document.addEventListener("DOMContentLoaded", function () {
    var switcher = document.querySelector(".lang");
    if (!switcher) return;
    var select = switcher.querySelector("select");
    supported.forEach(function (code) {
      var option = new Option(name(code), code);
      option.lang = code;
      select.add(option);
    });
    select.value = root.lang;
    switcher.hidden = false;
    select.addEventListener("change", function () {
      apply(select.value);
      try { localStorage.setItem(key, select.value); } catch (e) {}
    });
  });
})();
