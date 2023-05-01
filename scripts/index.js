import {
  firstRowBtns,
  secondRowBtns,
  thirdRowBtns,
  fourthRowBtns,
  fifthRowBtns
} from './data.js';

const page = document.querySelector('body');
page.classList.add('page');
const buttons = document.querySelectorAll('.keyboard__btn');

//create elements
const header = document.createElement('header');
const main = document.createElement('main');
const textArea = document.createElement('textarea');
const keyboardArea = document.createElement('section');
const footer = document.createElement('footer');
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
      //Кнопка смены языка
      if( i.code === 'AltRight'){
        button.addEventListener('click', changeLang);
      }
      if (i.code === 'CapsLock'){
        button.addEventListener('click', addUpperCase);
      }
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
      //Кнопка смены языка
      if( i.code === 'AltRight'){
        button.addEventListener('click', changeLang);
      }
      if (i.code === 'CapsLock'){
        button.addEventListener('click', addUpperCase);
      }
    })

  }

}

createButtons(firstRow, firstRowBtns);
createButtons(secondRow, secondRowBtns);
createButtons(thirdRow, thirdRowBtns);
createButtons(fourthRow, fourthRowBtns);
createButtons(fifthRow, fifthRowBtns);

//Добавялем классы к элементам
header.classList.add('header');
main.classList.add('main');
textArea.classList.add('main__text');
keyboardArea.classList.add('keyboard');
footer.classList.add('footer');
keyboardRows.forEach(i => i.classList.add('keyboard__row'));

//Добавляем класс спец кнопок
function additionalClass(){
  const backspaceBtn = firstRow.querySelector('.keyboard__btn:last-child');
  const capsBtn = thirdRow.querySelector('.keyboard__btn:first-child');
  const enterBtn = thirdRow.querySelector('.keyboard__btn:last-child');
  const tabBtn = secondRow.querySelector('.keyboard__btn:first-child');
  const slashBtn = secondRow.querySelector('.keyboard__btn:last-child');
  const leftShiftBtn = fourthRow.querySelector('.keyboard__btn:first-child');
  const rightShiftBtn = fourthRow.querySelector('.keyboard__btn:last-child');
  const elements = fifthRow.querySelectorAll('.keyboard__btn');
  const spaceBtn = elements[3];
  const leftAltBtn = elements[2];
  const rightAltBtn = elements[4];
  backspaceBtn.classList.add('keyboard__btn_size_medium');
  capsBtn.classList.add('keyboard__btn_size_medium');
  capsBtn.id = 'capslock';
  enterBtn.classList.add('keyboard__btn_size_medium');
  tabBtn.classList.add('keyboard__btn_size_small');
  slashBtn.classList.add('keyboard__btn_size_small');
  leftShiftBtn.classList.add('keyboard__btn_size_large');
  rightShiftBtn.classList.add('keyboard__btn_size_small');
  spaceBtn.classList.add('keyboard__btn_type_space');
  leftAltBtn.classList.add('keyboard__btn_size_small');
  rightAltBtn.classList.add('keyboard__btn_size_small');
}

additionalClass();

renderElements(page, basicElements);
renderElements(main, mainElements);
renderElements(keyboardArea, keyboardRows);

//Функция для обработчика событий.
//Появление символа в тестовом поле.
function addBtnsListener(evt){
  const btnCapsLock = keyboardArea.querySelector('#capslock');
  if(btnCapsLock.classList.contains('keyboard__btn_type_capslock')){
    textArea.value += evt.target.dataset.value.toUpperCase();
  } else {
    textArea.value += evt.target.dataset.value;
  }
  if(evt.target.textContent === 'Backspace'){
    removeElement();
  }
  if(evt.target.textContent === 'Enter'){
    textArea.value += '\n';
  }
}

// Функция которая работает с нажатием кнопок.
function pushBtn(evt){
  const btnCapsLock = keyboardArea.querySelector('#capslock');
  highlightButton(evt.code)

  if(evt.key === 'Backspace'){
    removeElement();
  } else if(evt.key === 'Tab'){
    textArea.value += ' ';
  } else if(evt.key === 'Enter'){
    textArea.value += '\n'
  } else if(evt.key === 'ArrowUp'){
    textArea.value += '↑';
  } else if(evt.key === 'ArrowLeft'){
    textArea.value += '←';
  } else if(evt.key === 'ArrowRight'){
    textArea.value += '→';
  } else if(evt.key === 'ArrowDown'){
    textArea.value += '↓';
  } else if(evt.key === 'Space'){
    textArea.value += ' ';
  } else if(evt.code === 'AltRight'){
    changeLang();
  } else if(evt.code === 'AltLeft'){
    textArea.value += '';
  } else if(evt.key === 'Control'){
    textArea.value += '';
  } else if(evt.key === 'Meta'){
    textArea.value += '';
  } else if(evt.key === 'CapsLock'){
    textArea.value += '';
    addUpperCase();
  } else if(evt.key === 'Shift'){
    textArea.value += '';
  } else {
    if(btnCapsLock.classList.contains('keyboard__btn_type_capslock')){
      textArea.value += evt.key.toUpperCase();
    } else {
    textArea.value += evt.key;
    }
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

//Функция для смены языка.
function changeLang(){
  const button = fifthRow.querySelectorAll('.keyboard__btn')[4];
  if(button){
    keyboardArea.classList.toggle('en');
    removeBtnsListener();
    createButtons(firstRow, firstRowBtns);
    createButtons(secondRow, secondRowBtns);
    createButtons(thirdRow, thirdRowBtns);
    createButtons(fourthRow, fourthRowBtns);
    createButtons(fifthRow, fifthRowBtns);
    additionalClass();
  }
}

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
    button.classList.add('keyboard__btn_type_keydown');
  }
}

//Удаление подсветки.
function removeHighlight() {
  const virtualButtons = keyboardArea.querySelectorAll('.keyboard__btn');
  virtualButtons.forEach(button => {
    button.classList.remove('keyboard__btn_active');
    button.classList.remove('keyboard__btn_type_keydown');
  });
}

function addUpperCase(){
  const btnCapsLock = keyboardArea.querySelector('#capslock');
  btnCapsLock.classList.toggle('keyboard__btn_type_capslock');
}

//Текс на странице
const title = document.createElement('h1');
title.classList.add('header__title');
title.textContent = 'Virtual Keyboard'
header.append(title);

const footerText = document.createElement('p');
const footerInstruction = document.createElement('p');
footerText.classList.add('footer__text');
footerInstruction.classList.add('footer__text');
footerText.textContent = 'Клавиатура создана в операционной системе Windows'
footerInstruction.textContent = 'Для переключения языка используйте клавишу: правый alt'
footer.append(footerText, footerInstruction);