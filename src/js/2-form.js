const form = document.querySelector(".feedback-form")
const localStorageKey = "feedback-form-state"
const savedData = JSON.parse(localStorage.getItem(localStorageKey));
if (savedData) {
  form.elements.email.value = savedData.email;
  form.elements.message.value = savedData.message;
}
form.addEventListener('input', event => {
  localStorage.setItem(localStorageKey,JSON.stringify({
  email: form.elements.email.value.trim(),
  message: form.elements.message.value.trim()
  }));
});
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = {
  email: event.target.elements.email.value.trim(),
  message: event.target.elements.message.value.trim()
    };
    if (formData.email !== "" && formData.message !== "") {
      console.log(formData)
      localStorage.removeItem(localStorageKey)
      form.reset()
    }
  });
