document.addEventListener('DOMContentLoaded', function() {
    // Start timer button click handler
    document.getElementById('start').addEventListener('click', function() {
      chrome.runtime.sendMessage({ action: 'startTimer' });
    });
  
    // Stop timer button click handler
    document.getElementById('stop').addEventListener('click', function() {
      chrome.runtime.sendMessage({ action: 'stopTimer' });
    });
  
    // Reset timer button click handler
    document.getElementById('reset').addEventListener('click', function() {
      chrome.runtime.sendMessage({ action: 'resetTimer' });
      document.getElementById('elapsed-time').textContent = '0:00';
    });
  
    // Function to update timer display
    function updateTimerDisplay() {
      chrome.runtime.sendMessage({ action: 'getTimer' }, function(response) {
        const { timerRunning, elapsedTime } = response;
        if (timerRunning) {
          document.getElementById('timer').textContent = formatTime(elapsedTime);
        } else {
          document.getElementById('timer').textContent = 'Not started';
        }
      });
    }
  
    // Update timer display initially
    updateTimerDisplay();
  
    // Update timer display every second
    setInterval(updateTimerDisplay, 1000);
  });
  
  // Function to format time as MM:SS
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  