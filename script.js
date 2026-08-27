let timerT = null;
let timeleft = 60;
let breakT = null;
let savedTimeleft = null;
let isPaused = false;

const startBtn = document.getElementById("button");
const timerId = document.getElementById("timer");
const longBreak = document.getElementById("long");
const shortBreak = document.getElementById("short");
const DURATION = {
    shortBreak: 30,
    longBreak: 60,
};


const resetButton = document.getElementById("btn1");


function updateDisplay(secondsRemaining) {
    const minutes = Math.floor(secondsRemaining / 60);
    const seconds = secondsRemaining % 60;

    timerId.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function parseDuration(value) {
    const parts = value.trim().split(":").map(Number);

    if (parts.some((part) => !Number.isInteger(part) || part < 0)) {
        return null;
    }

    if (parts.length === 1) return parts[0];
    if (parts.length === 2) return (parts[0] * 60) + parts[1];
    if (parts.length === 3) return (parts[0] * 3600) + (parts[1] * 60) + parts[2];

    return null;
}

function startWorkTimer() {
    if (timerT !== null) return;

    timerT = setInterval(() => {
        timeleft--;
        updateDisplay(timeleft);

        if (timeleft <= 0) {
            clearInterval(timerT);
            timerT = null;
            timeleft = 60;
            isPaused = false;
            savedTimeleft = null;
            updateDisplay(timeleft);
            startBtn.textContent = "START";
            startBtn.disabled = false;
        }
    }, 1000);
}

resetButton.addEventListener("click", function () {
    if (timerT !== null) {
        clearInterval(timerT);
        timerT = null;

    }
    if (breakT !== null) {
        clearInterval(breakT);
        breakT = null;
    }
    isPaused = false;
    startBtn.textContent = "START";
    savedTimeleft = null;
    timeleft = 60;
    updateDisplay(timeleft);
    startBtn.disabled = false;
});

shortBreak.addEventListener("click", function () {


    if (timerT !== null) {
        clearInterval(timerT);
        timerT = null;
    }

    savedTimeleft = timeleft;
    startBtn.disabled = true;

    
    breakT = setTimeout(() => {
        breakT = null;
        timeleft = savedTimeleft;
        savedTimeleft = null;
        updateDisplay(timeleft);
        startWorkTimer();
    }, DURATION.shortBreak * 1000);
startBtn.disabled = false;
});

longBreak.addEventListener("click", function () {

    if (timerT !== null) {
        clearInterval(timerT);
        timerT = null;
    } 

    savedTimeleft = timeleft;
    startBtn.disabled = true;
    breakT = setTimeout(() => {
        breakT = null;
        timeleft = savedTimeleft;
        savedTimeleft = null;
        updateDisplay(timeleft);
        startWorkTimer();
    }, DURATION.longBreak * 1000);
    startBtn.disabled = false;
});

startBtn.addEventListener("click", function () {
    if (startBtn.disabled) return;

    if (timerT === null && !isPaused) {
        startWorkTimer();
        startBtn.textContent = "PAUSE";
    } else if (!isPaused) {
        clearInterval(timerT);
        timerT = null;
        isPaused = true;
        savedTimeleft = timeleft;
        startBtn.textContent = "START";
    } else {
        isPaused = false;
        timeleft = savedTimeleft;
        savedTimeleft = null;
        startWorkTimer();
        startBtn.textContent = "PAUSE";
    }
});
updateDisplay(timeleft);

const settingsBtn = document.getElementById("settingsBtn");
const settingsModal = document.getElementById("settingsModal");
const closeModalBtn = document.getElementById("closeModal");
const cancelBtn = document.getElementById("cancelBtn");
const saveBtn = document.getElementById("saveBtn");
const timeFormat = document.getElementById("timeFormat");
const shortTime = document.getElementById("shortTime");
const longTime = document.getElementById("longTime");

settingsBtn.addEventListener("click", function() {
    shortTime.value = `${String(Math.floor(DURATION.shortBreak / 60)).padStart(2, "0")}:${String(DURATION.shortBreak % 60).padStart(2, "0")}`;
    longTime.value = `${String(Math.floor(DURATION.longBreak / 60)).padStart(2, "0")}:${String(DURATION.longBreak % 60).padStart(2, "0")}`;
    settingsModal.showModal();
});
closeModalBtn.addEventListener("click", function() {
    settingsModal.close();
});
cancelBtn.addEventListener("click", function () {
settingsModal.close();
});

saveBtn.addEventListener("click", function(){
const totalSeconds = parseDuration(timeFormat.value);
const shortBreakSeconds = parseDuration(shortTime.value);
const longBreakSeconds = parseDuration(longTime.value);

if (totalSeconds > 0 && shortBreakSeconds > 0 && longBreakSeconds > 0) {
    DURATION.shortBreak = shortBreakSeconds;
    DURATION.longBreak = longBreakSeconds;
    timeleft = totalSeconds;
updateDisplay(timeleft);
settingsModal.close();
} else {
    alert("Please enter a valid time.");

}
});
