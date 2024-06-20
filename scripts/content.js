// content.js

let reading = false;
let timeout;

// Function to start reading session
function startReading() {
  if (!reading) {
    reading = true;
    chrome.runtime.sendMessage({ action: 'start' });
    console.log('Reading started');
  }
}

// Function to stop reading session
function stopReading() {
  if (reading) {
    reading = false;
    chrome.runtime.sendMessage({ action: 'stop' });
    console.log('Reading stopped');
  }
}

// Function to handle scroll events
function handleScroll() {
  clearTimeout(timeout);
  startReading();
  timeout = setTimeout(stopReading, 3000); // Stop reading after 3 seconds of inactivity
}

// Attach scroll event listener
window.addEventListener('scroll', handleScroll);

// Start reading if the user is already scrolling when the content script is injected
handleScroll();
