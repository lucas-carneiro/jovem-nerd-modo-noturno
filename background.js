'use strict';

chrome.runtime.onInstalled.addListener(function() {

  // Função usada pelo site para ativar o night mode.
  // Linha 16797, main.js:formatted
  const s = "window.toggleNightMode()";

  // Script injection na página
  const script = `
    let nm = document.createElement("script");
    nm.innerHTML = "${s}";
    document.head.appendChild(nm);
  `;

  chrome.webNavigation.onDOMContentLoaded.addListener(function(details) {
    chrome.tabs.executeScript(details.tabId, {
        code: `
          ${script}
          document.addEventListener("turbolinks:load", () => { ${script} });
        `
    });
  }, {
    url: [{
        hostEquals: 'jovemnerd.com.br'
    }],
  });
});
