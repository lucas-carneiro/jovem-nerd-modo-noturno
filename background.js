'use strict';

chrome.webNavigation.onDOMContentLoaded.addListener(function(details) {

  const script = `document.body.className = document.body.className.replace("light-skin","");`;

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