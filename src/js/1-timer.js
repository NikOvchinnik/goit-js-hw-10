import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputElem = document.querySelector('#datetime-picker');
const buttonElem = document.querySelector('[data-start]');
const timerFields = document.querySelectorAll('.value');

function btnDisabled() {
  buttonElem.setAttribute('disabled', 'disabled');
}

btnDisabled();

function btnEnable() {
  buttonElem.removeAttribute('disabled');
}

function inputDisabled() {
  inputElem.setAttribute('disabled', 'disabled');
}

let userSelectedDate = '';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() <= new Date()) {
      btnDisabled();
      return iziToast.show({
        title: 'Error',
        titleColor: '#fff',
        titleSize: '16',
        titleLineHeight: '1.5',
        message: 'Please choose a date in the future',
        messageColor: '#fff',
        messageSize: '16',
        messageLineHeight: '1.5',
        backgroundColor: '#ef4040',
        position: 'topRight',
      });
    } else {
      btnEnable();
      return (userSelectedDate = selectedDates[0]);
    }
  },
};

flatpickr(inputElem, options);

buttonElem.addEventListener('click', onClickButton);

function onClickButton() {
  if (userSelectedDate > new Date()) {
    const remainingTime = userSelectedDate.getTime() - new Date().getTime();
    startTimer(remainingTime);
    inputDisabled();
  }
  return btnDisabled();
}

function startTimer(time) {
  const timerInterval = setInterval(() => {
    time -= 1000;
    if (time <= 0) {
      clearInterval(timerInterval);
    } else {
      updateTimerDisplay(time);
    }
  }, 1000);
}

function updateTimerDisplay(timerTime) {
  const timer = convertMs(timerTime);
  timerFields[0].textContent = addLeadingZero(timer.days);
  timerFields[1].textContent = addLeadingZero(timer.hours);
  timerFields[2].textContent = addLeadingZero(timer.minutes);
  timerFields[3].textContent = addLeadingZero(timer.seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
