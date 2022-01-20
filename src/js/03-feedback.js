import throttle from "lodash.throttle";

const form = document.querySelector('.feedback-form')
let feedback = {
    email: '',
    message: ''
};

form.addEventListener('input', throttle(getFeedback, 500));
form.addEventListener('submit', onFormSubmit);

const savedData = localStorage.getItem("feedback-form-state");

if (savedData) {
    const parsedData = JSON.parse(savedData);
    let { elements: { email, message } } = form;

    email.value = parsedData.email;
    message.textContent = parsedData.message;
};

function getFeedback() {
    let { elements: { email, message } } = form;

    feedback = {
        email: email.value,
        message: message.value
    }

    localStorage.setItem("feedback-form-state", JSON.stringify(feedback));
};

function onFormSubmit(e) {
    e.preventDefault();

    let { elements: { email, message } } = form;
    console.log({ email: email.value, message: message.value });

    formValidation();
}

function formValidation() { 
    let { elements: { email, message } } = form;
    if (email.value.trim() === '') {
        alert("Please, fill in 'email' field")
    };
    if (message.value === '') {
        alert("Please, fill in 'message' field")
    };
    if (email.value.trim() !== '' && message.value !== '') {
        clearForm();
    };
}

function clearForm() {
    localStorage.clear();
    form.reset();
}