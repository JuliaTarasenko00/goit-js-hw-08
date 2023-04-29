import throttle from 'lodash.throttle';
import storage from './local';


 const formEl = document.querySelector('.feedback-form');
 const emailEl = document.querySelector('input[name="email"]');
 const massageEl = document.querySelector('textarea[name="message"]');
 
  
// console.log(refs.inputEmail);
// console.log(refs.textareaMassage);
// console.log(refs.buttonEl);
formEl.addEventListener('input', throttle(onTextareaMassage, 500));
formEl.addEventListener('submit', onSubmit);


const STORAGE_KEY = 'feedback-form-state';
const formData = {};

const elements = {
  password: emailEl,
  login: massageEl,
}

returnTextareaMassage();

function onTextareaMassage({ target }) {
    const { name, value } = target;
    formData[name] = value;
    storage.save(STORAGE_KEY, formData);
  }
  
  function onSubmit(e) {
    e.preventDefault();

    
    if (elements.password.value === '' || elements.login.value === '') {
        alert('Заповніть усі поля!');
        return;
      }
    formEl.reset();
    storage.remove(STORAGE_KEY);
    console.log(formData);
  }
function returnTextareaMassage() {
    const massage = storage.load(STORAGE_KEY);
    if (massage) {
      for (let el in massage) {
        formEl[el].value = massage[el];
        formData[el] = massage[el];
      }
    }
  }