let timerRunning = false;
let elapsedTime = 0;
let intervalId = null;

function startTimer() {
  if (!timerRunning) {
    timerRunning = true;
    intervalId = setInterval(updateTime, 1000); // Update time every second
  }
}

function stopTimer() {
  if (timerRunning) {
    timerRunning = false;
    clearInterval(intervalId);
    intervalId = null;
  }
}

function resetTimer() {
  timerRunning = false;
  elapsedTime = 0;
  clearInterval(intervalId);
  intervalId = null;
  chrome.storage.local.set({ timerRunning: timerRunning, elapsedTime: elapsedTime });
}

function updateTime() {
  elapsedTime++;
  chrome.storage.local.set({ timerRunning: timerRunning, elapsedTime: elapsedTime });
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'startTimer') {
    startTimer();
  } else if (request.action === 'stopTimer') {
    stopTimer();
  } else if (request.action === 'resetTimer') {
    resetTimer();
  } else if (request.action === 'getTimer') {
    sendResponse({ timerRunning: timerRunning, elapsedTime: elapsedTime });
  }
});
