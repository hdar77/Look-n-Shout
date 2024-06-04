/* console.log("background");

// Function to handle messages from the content script
function handleMessage(request, sender, sendResponse) {
    if (request.action === "click") {
        console.log("CLICK");
    }
}

// Listen for messages from the content script
chrome.runtime.onMessage.addListener(handleMessage);


// background.js

console.log("TEST")

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    console.log("Message from content script:", message);
    
    // Send a response back to the content script
    sendResponse({farewell: "Goodbye from background.js"});
  });

function handleMessage(request, sender, sendResponse) {
    if (request.action === "click") {
        console.log("CLICK");
    }
}
*/
// Listen for messages from the content script
chrome.tabs.onActivated.addListener((activeInfo) => {
    console.log("TEST")
    chrome.scripting.executeScript({
        target: { tabId: activeInfo.tabId },
        files: ["./js/WebSpeech.js"]
    });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'exampleMessage') {
      // Handle the message
      sendResponse({ response: 'Received your message' });
      console.log(message)
    }
  });

  function sendMessageToContentScript(tabId) {
    
    chrome.tabs.sendMessage(tabId, { type: 'exampleMessage', data: 'Hello from background' }, response => {
      if (chrome.runtime.lastError) {
        console.error('Error sending message:', chrome.runtime.lastError);
      } else {
        console.log('Response from content script:', response);
      }
    });
  }
  
  // Example: Sending a message to the active tab
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    if (tabs.length > 0) {
      sendMessageToContentScript(tabs[0].id);
    }
  });