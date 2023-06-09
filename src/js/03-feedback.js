import throttle from 'lodash.throttle';
import storage from './local';


 const formEl = document.querySelector('.feedback-form');

formEl.addEventListener('input', throttle(onTextareaMassage, 500));
formEl.addEventListener('submit', onSubmit);


const STORAGE_KEY = 'feedback-form-state';
let formData = {};

returnTextareaMassage();

function onTextareaMassage({ target }) {
    const { name, value } = target;
    formData[name] = value;
    storage.save(STORAGE_KEY, formData);
  }
  
  function onSubmit(e) {
    e.preventDefault();

    
    if (!formData.message || !formData.email) {
        alert('Заповніть усі поля!');
        return;
      }

    formEl.reset();
    storage.remove(STORAGE_KEY);
    console.log(formData);
    formData = {};
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