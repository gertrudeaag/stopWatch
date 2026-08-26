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
    if (breakT !== null) return;

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
});

longBreak.addEventListener("click", function () {
    // if (longT !== null) return;

    if (timerT !== null) {
        clearInterval(timerT);
        timerT = null;
    }
    savedTimeleft = timeleft;
    startBtn.disabled = true;
    longT = setTimeout(() => {
        longT = null;
        timeleft = savedTimeleft;
        savedTimeleft = null;
        updateDisplay(timeleft);
        startWorkTimer();
    }, DURATION.longBreak * 1000);
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

//let currentFormat ="ms";

settingsBtn.addEventListener("click", function() {
    settingsModal.showModal();
});
closeModalBtn.addEventListener("click", function() {
    settingsModal.close();
});
cancelBtn.addEventListener("click", function () {
settingsModal.close();
});

saveBtn.addEventListener("click", function(){
const inputVal = timeFormat.value.trim();
const parts =inputVal.split(":");
let totalSeconds = 0;

if (parts.length === 2 ) {
    const minutes = parseInt(parts[0], 10);
    const seconds = parseInt(parts[1], 10);
    if (!isNaN(minutes) && !isNaN(seconds)) {
        totalSeconds = (minutes * 60) + seconds;
    }
} else if (parts.length === 3){
    const hours = parseInt(parts[0], 10);
    const minutes =parseInt(parts[1], 10);
    const seconds =parseInt(parts[2], 10);
    totalSeconds = (hours * 3600) + (minutes * 60) +seconds;
} else {
    totalSeconds = parseInt(inputVal, 10);
}


if (!isNaN(totalSeconds) && totalSeconds > 0) {
    timeleft = totalSeconds;
updateDisplay(timeleft);
settingsModal.close();
} else {
    alert("Please enter a valid time.");
}
});
