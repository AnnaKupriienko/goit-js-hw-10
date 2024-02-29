import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const calendar = document.getElementById("datetime-picker")
const btnStart = document.querySelector("[data-start]")
const currentDays = document.querySelector("[data-days")
const currentHours = document.querySelector("[data-hours")
const currentMinutes = document.querySelector("[data-minutes")
const currentSeconds = document.querySelector("[data-seconds")

btnStart.disabled = true; 
btnStart.addEventListener("click", () => {
    btnStart.disabled = true;
    calendar.disabled = true;
    startTimer()
});


let userSelectedDate;
let delta;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
        if (userSelectedDate < options.defaultDate) {
            btnStart.disabled = true; 
            iziToast.error({
                title: 'Error',
                message: '"Please choose a date in the future"',
            });
        }
        else {
            btnStart.disabled = false; 
            delta = userSelectedDate - options.defaultDate;
            updateClock(convertMs(userSelectedDate))
            console.log(delta);
            }
    console.log(selectedDates[0])},
};
flatpickr(calendar, options);

let intervalId;
function timer() { 
    if (delta > 1000) {
        delta += 1000;
        updateClock(convertMs(delta))
    }
    else {
        clearInterval(intervalId)
        calendar.disabled = false;
    }
}
    
function startTimer() {
  clearInterval(intervalId);
  intervalId = setInterval(timer, 1000);
}


function updateClock (days, hours, minutes, seconds) {
    currentDays.textContent = `${days}`
    currentHours.textContent = `${hours}`
    currentMinutes.textContent = `${minutes}`
    currentSeconds.textContent = `${seconds}`
} 


function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = pad(Math.floor(ms / day));
    // Remaining hours
    const hours = pad(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = pad(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
}
console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function pad (value) {
    return String(value).padStart(2,"0")
}