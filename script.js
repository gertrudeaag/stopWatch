let timerT = null;
let timeleft = 60;
let breakT = null;
let savedTimeleft = null;
let longT =null;
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
    console.log(timerId)
    timerId.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function startWorkTimer() {
    timerT = setInterval(() => {
        timeleft--;
        updateDisplay(timeleft);

        if (timeleft <= 0) {
            clearInterval(timerT);
            timerT = null;
            timeleft = 60;
            updateDisplay(timeleft);
            startBtn.disabled = false;
        }
    }, 1000);
}


// startBtn.addEventListener('click', () => {
//     if (timerT !== null) return;
//     startBtn.disabled = true;
//     startWorkTimer();
//});



resetButton.addEventListener("click", function () {
    if (timerT !== null) {
        clearInterval(timerT);
        timerT = null;
    }
    if (breakT !== null) {
        clearTimeout(breakT);
        breakT = null;
    }
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
longBreak.addEventListener("click", function(){
if (longT !== null)return;

if (timerT !== null) {
    clearInterval(timerT);
    timerT = null;
}
savedTimeleft = timeleft;
startBtn.disabled = true;
longT = setTimeout(() => {
    longT = null;
    timeleft = savedTimeleft;
    savedTimeleft =null;
    updateDisplay(timeleft);
   startWorkTimer(); 
}, DURATION.longBreak * 1000);
});
startBtn.addEventListener("click", function (){
    if (timerT == null && !isPaused) {
        startWorkTimer();
    } else if (!isPaused) {
        clearInterval(timerT); 
        timerT = null;
        isPaused = true;
        savedTimeleft = timeleft;
        startBtn.textContent = "PAUSE"; 
    } else {
        isPaused = false;
        timeleft = savedTimeleft;
        startWorkTimer();
        startBtn.textContent = "START";
    }
});
updateDisplay(timeleft);

