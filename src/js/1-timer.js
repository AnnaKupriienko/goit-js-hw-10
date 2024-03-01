import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const calendar = document.getElementById("datetime-picker")
const btnStart = document.querySelector("[data-start]")
const currentDays = document.querySelector("[data-days]")
const currentHours = document.querySelector("[data-hours]")
const currentMinutes = document.querySelector("[data-minutes]")
const currentSeconds = document.querySelector("[data-seconds]")


btnStart.addEventListener("click", () => {
    btnStart.disabled = true;
    calendar.disabled = true;
    startTimer()
});
btnStart.disabled = true; 
let userSelectedDate;
let delta;
let interval;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
  
    onClose(selectedDates) {
        userSelectedDate = new Date(selectedDates[0]).getTime();
        const currentDate = Date.now();
        if (userSelectedDate < currentDate) {
            btnStart.disabled = true;
            iziToast.error({
                title: 'Error',
                fontSize: 'large',
                close: false,
                position: 'topCenter',
                messageColor: 'black',
                timeout: 3000,
                backgroundColor: 'red',
                message: '"Please choose a date in the future"',
            });
        }
        else {
            btnStart.disabled = false;
            delta = userSelectedDate - currentDate;
            updateClockFace(convertMs(delta))
            console.log(updateClockFace)
        };
    }
};
    
flatpickr(calendar, options);


function timer() { 
    if (delta > 1000) {
        delta -= 1000;
        updateClockFace(convertMs(delta));
    }
    else {
        clearInterval(interval);
        calendar.disabled = false;
    }
}

function startTimer() {
    clearInterval(interval);
    interval = setInterval(timer, 1000);
 
}

function updateClockFace({ days, hours, minutes, seconds }) {
    currentDays.textContent = `${days}`;
    currentHours.textContent = `${hours}`;
    currentMinutes.textContent = `${minutes}`;
    currentSeconds.textContent = `${seconds}`;
} 

function pad (value) {
    return String(value).padStart(2, "0");
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

