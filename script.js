// Time Manager Variables
let timerInterval;
let stopwatchInterval;
let timerSeconds = 0;
let stopwatchSeconds = 0;
let timerEndTime;

// Update the Clock every second
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('clock').innerText = `${hours}:${minutes}:${seconds}`;
}

// Update Timer display
function updateTimerDisplay() {
    const currentTime = timerEndTime - Math.floor(Date.now() / 1000);
    if (currentTime <= 0) {
        clearInterval(timerInterval);
        document.getElementById('timerDisplay').innerText = "00:00:00";
        return;
    }
    const hours = String(Math.floor(currentTime / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((currentTime % 3600) / 60)).padStart(2, '0');
    const seconds = String(currentTime % 60).padStart(2, '0');
    document.getElementById('timerDisplay').innerText = `${hours}:${minutes}:${seconds}`;
}

// Timer Functions
function startTimer() {
    const hours = parseInt(document.getElementById('hours').value) || 0;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;
    const duration = hours * 3600 + minutes * 60 + seconds;
    if (duration <= 0) return;
    timerEndTime = Math.floor(Date.now() / 1000) + duration;
    if (timerInterval) return;
    timerInterval = setInterval(updateTimerDisplay, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {
    stopTimer();
    document.getElementById('timerDisplay').innerText = "00:00:00";
}

// Update Stopwatch display
function updateStopwatchDisplay() {
    const hours = String(Math.floor(stopwatchSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((stopwatchSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(stopwatchSeconds % 60).padStart(2, '0');
    document.getElementById('stopwatchDisplay').innerText = `${hours}:${minutes}:${seconds}`;
}

// Stopwatch Functions
function startStopwatch() {
    if (stopwatchInterval) return;
    stopwatchInterval = setInterval(() => {
        stopwatchSeconds++;
        updateStopwatchDisplay();
    }, 1000);
}

function stopStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
}

function resetStopwatch() {
    stopStopwatch();
    stopwatchSeconds = 0;
    updateStopwatchDisplay();
}

// Event Listeners
document.getElementById('startTimer').addEventListener('click', startTimer);
document.getElementById('stopTimer').addEventListener('click', stopTimer);
document.getElementById('resetTimer').addEventListener('click', resetTimer);

document.getElementById('startStopwatch').addEventListener('click', startStopwatch);
document.getElementById('stopStopwatch').addEventListener('click', stopStopwatch);
document.getElementById('resetStopwatch').addEventListener('click', resetStopwatch);

// Initial Clock Update
setInterval(updateClock, 1000);
updateClock();
