if ("production" === process.env.NODE_ENV) {
  // var importScripts = require("./polyfill/importscripts.js");
/*  if (navigator.userAgent.indexOf("Trident") > -1) {
    if (
      typeof Promise != "function" ||
      typeof Symbol != "function" ||
      typeof Reflect != "object" ||
      typeof fetch != "function" ||
      typeof Response != "function" ||
      "function" != typeof URL ||
      "function" != typeof URLSearchParams ||
      "function" != typeof Event ||
      "function" != typeof CustomEvent ||
      "function" != typeof EventTarget
    ) {*/
      require("./lib/polyfill.min.js");
      /* importScripts(
        "https://cdn.jsdelivr.net/gh/masx200/webpack-react-vue-spa-awesome-config@2.4.0/lib/polyfill.min.js"
      );*/
  //  }
 // }
}

// function importScripts(url) {
//   var xhr = new XMLHttpRequest();
//   // var args = Array.prototype.slice.call(arguments),
//   //   len = args.length,
//   //   i = 0,
//   //   meta,
//   //   data,
//   //   content;
//   // for (; i < len; i++) {
//   //   if (args[i].substr(0, 5).toLowerCase() === "data:") {
//   //     data = args[i];
//   //     content = data.indexOf(",");
//   //     meta = data.substr(5, content).toLowerCase();
//   //     data = decodeURIComponent(data.substr(content + 1));
//   //     if (/;\s*base64\s*[;,]/.test(meta)) {
//   //       data = atob(data);
//   //     }
//   //     if (/;\s*charset=[uU][tT][fF]-?8\s*[;,]/.test(meta)) {
//   //       data = decodeURIComponent(escape(data));
//   //     }
//   //   } else {
//   // xhr.open("GET", args[i], false);
//   xhr.open("GET", url, false);
//   xhr.send(null);
//   var data = xhr.responseText;
//   eval(data);
//   //   }
//   //   globalEval(data);
//   // }
// }
