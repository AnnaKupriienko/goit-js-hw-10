import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form")

form.addEventListener("submit", event => {
    event.preventDefault();
    const delay = Number(form.delay.value);
    const promiseState = form.state.value;
    const promise = new Promise((res, rej) => {
        setTimeout(() => {
            if (promiseState === 'fulfilled') {
                res(`${delay}`)
            }
            else {
                rej(`${delay}`)
            }
        }, delay)
    })
    promise.then(value => {
     iziToast.success({
title: 'OK',
    message: `✅ Fulfilled promise in ${delay}ms`,
    fontSize: 'large',
    close: false,
    position: 'topCenter',
    messageColor: 'black',
    timeout: 2000,
    backgroundColor: 'green'
    
});
    }
    )
    promise.catch(error => {
        iziToast.error({
    title: 'Error',
    message: `❌ Rejected promise in ${delay}ms`,
    fontSize: 'large',
    close: false,
    position: 'topCenter',
    messageColor: 'black',
    timeout: 2000,
    backgroundColor: 'red'
});
    })
})

