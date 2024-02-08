import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formElem = document.querySelector('.form');
const inputState = document.querySelectorAll('input[name="state"]');
const inputDelay = document.querySelector('input[name="delay"]');

formElem.addEventListener('submit', onSubmitForm);

function onSubmitForm(e) {
  e.preventDefault();
  let valueState;
  inputState.forEach(radioBtn => {
    if (radioBtn.checked) {
      valueState = radioBtn.value;
    }
  });

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (valueState === 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${inputDelay.value}ms`);
      } else if (valueState === 'rejected') {
        reject(`❌ Rejected promise in ${inputDelay.value}ms`);
      }
    }, inputDelay.value);
  });

  promise
    .then(value => {
      return iziToast.show({
        message: value,
        messageColor: '#fff',
        messageSize: '16',
        messageLineHeight: '1.5',
        backgroundColor: '#59a10d',
        position: 'topRight',
      });
    })
    .catch(error => {
      return iziToast.show({
        message: error,
        messageColor: '#fff',
        messageSize: '16',
        messageLineHeight: '1.5',
        backgroundColor: '#ef4040',
        position: 'topRight',
      });
    });
}
