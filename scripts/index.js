import { firstRowBtns, secondRowBtns, thirdRowBtns } from './data.js';

const page = document.querySelector('.page');
const buttons = document.querySelectorAll('.keyboard__btn');

//create elements
const header = document.createElement('header');
const main = document.createElement('main');
const textArea = document.createElement('textarea');
const keyboardArea = document.createElement('section');
keyboardArea.classList.add('en');
const footer = document.createElement('footer');

const btn = document.createElement('button');
btn.classList.add('btn');
header.append(btn);

const firstRow = document.createElement('div');
const secondRow = document.createElement('div');
const thirdRow = document.createElement('div');
const fourthRow = document.createElement('div');
const fifthRow = document.createElement('div');


const basicElements = [header, main, footer];
const mainElements = [textArea, keyboardArea];
const keyboardRows = [firstRow, secondRow, thirdRow, fourthRow, fifthRow];

//Функция отрисовывает блоки на страницу.
function renderElements(area, array){
  array.forEach(i => area.append(i))
}

//Функция создает элемент кнопку и вставляет ее в передаваемый контейнер(ряд кнопок).
//Так же внутри функции мы вешаем обработчики событий на кнопки. И добавляем доп классы спец кнопкам.
function createButtons(container, array){
  container.innerHTML = '';

  if(keyboardArea.classList.contains('en')){

    array.forEach(i => {
      const button = document.createElement('div');
      button.classList.add('keyboard__btn');
      button.dataset.value = i.valueEng;
      button.dataset.code = i.code;
      button.textContent = i.itemEng;
      container.append(button);
      button.addEventListener('click', addBtnsListener);
    })

  } else {

    array.forEach(i => {
      const button = document.createElement('div');
      button.classList.add('keyboard__btn');
      button.dataset.value = i.valueRu;
      button.dataset.code = i.code;
      button.textContent = i.itemRu;
      container.append(button);
      button.addEventListener('click', addBtnsListener);
    })

  }

  // addAdditionalClass(container);

}

createButtons(firstRow, firstRowBtns);
createButtons(secondRow, secondRowBtns);
createButtons(thirdRow, thirdRowBtns);

//add classes to elements
header.classList.add('header');
main.classList.add('main');
textArea.classList.add('main__text');
keyboardArea.classList.add('keyboard');
keyboardArea.classList.add('en');
footer.classList.add('footer');
keyboardRows.forEach(i => i.classList.add('keyboard__row'));

//add class to specific buttons
// function addAdditionalClass(container){
//   const backspaceBtn = container.querySelector('.keyboard__btn:last-child');
//   backspaceBtn.classList.add('keyboard__btn_type_backspace');
//   const capsBtn = container.querySelector('.keyboard__btn:first-child')
//   capsBtn.classList.add('keyboard__btn_type_backspace')
// }


//add class to specific buttons
function additionalClass(){
const backspaceBtn = firstRow.querySelector('.keyboard__btn:last-child');
const capsBtn = thirdRow.querySelector('.keyboard__btn:first-child');
backspaceBtn.classList.add('keyboard__btn_type_backspace');
capsBtn.classList.add('keyboard__btn_type_backspace');
}

additionalClass();




renderElements(page, basicElements);
renderElements(main, mainElements);
renderElements(keyboardArea, keyboardRows);




//Функция для обработчика событий.
//Появление символа в тестовом поле.
function addBtnsListener(evt){
  textArea.value += evt.target.dataset.value;
  if(evt.target.textContent === 'backspace'){
    removeElement();
  }
}

// Функция которая работает с нажатием кнопок.
function pushBtn(evt){
  highlightButton(evt.keyCode)
  if(evt.key === 'Backspace'){
    removeElement();
  } else if(evt.key === 'Tab'){
    textArea.value += ' ';
  } else {
    textArea.value += evt.key;
  }

  //Отключаем стандартные события для спец кнопок.
  if (isSpecialKey(evt.key)) {
    evt.preventDefault();
  }
}

//Функция для проверки на спец клавишы.
function isSpecialKey(key) {
  const specialKeys = ['Tab', 'CapsLock', 'Shift', 'Control', 'Alt', 'Enter'];
  return specialKeys.includes(key);
}

document.addEventListener('keydown', pushBtn);
document.addEventListener('keyup', removeHighlight);


//Функция удаляет обработчик событий с кнопок.
function removeBtnsListener(){
  buttons.forEach(button => {
    button.removeEventListener('click', addBtnsListener)
  })
}


//Функция для смены языка. Дополнить. Привязать к правильным кнопкам.
btn.addEventListener('click', () => {
  keyboardArea.classList.toggle('en');
  removeBtnsListener();
  createButtons(firstRow, firstRowBtns);
  createButtons(secondRow, secondRowBtns);
  createButtons(thirdRow, thirdRowBtns)
  additionalClass();
})




//Функции для специальных клавиш backspace etc.
function removeElement() {
  let currentText = textArea.value;
  if(currentText.length > 0){
    const newText = currentText.slice(0, -1);
    textArea.value = newText;
  }
}


//Подсветка кнопок при нажатии.
function highlightButton(key) {
  const button = keyboardArea.querySelector(`.keyboard__btn[data-code="${key}"]`);
  if (button) {
    button.classList.add('keyboard__btn_active');
  }
}

function removeHighlight() {
  const virtualButtons = keyboardArea.querySelectorAll('.keyboard__btn');
  virtualButtons.forEach(button => {
    button.classList.remove('keyboard__btn_active');
  });
}