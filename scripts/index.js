import { firstRowBtnsEng, secondRowBtnsEng } from './data.js';

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
//Так же в нутри функции мы вешаем обработчики событий на кнопки. И добавляем доп классы спец кнопкам.
function createButtons(container, array){
  container.innerHTML = '';

  if(keyboardArea.classList.contains('en')){

    array.forEach(i => {
      const button = document.createElement('div');
      button.classList.add('keyboard__btn');
      button.dataset.value = i.valueEng;
      button.textContent = i.itemEng;
      container.append(button);
      button.addEventListener('click', addBtnsListener);
    })

  } else {

    array.forEach(i => {
      const button = document.createElement('div');
      button.classList.add('keyboard__btn');
      button.dataset.value = i.valueRu;
      button.textContent = i.itemRu;
      container.append(button);
      button.addEventListener('click', addBtnsListener);
    })

  }

  addAdditionalClass();

}

createButtons(firstRow, firstRowBtnsEng);
createButtons(secondRow, secondRowBtnsEng);

//add classes to elements
header.classList.add('header');
main.classList.add('main');
textArea.classList.add('main__text');
keyboardArea.classList.add('keyboard');
keyboardArea.classList.add('en');
footer.classList.add('footer');
keyboardRows.forEach(i => i.classList.add('keyboard__row'));

//add class to specific buttons
function addAdditionalClass(){
  const firstRowLastBtn = firstRow.querySelector('.keyboard__btn:last-child');
  firstRowLastBtn.classList.add('keyboard__btn_type_backspace');
}





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


//Функция удаляет обработчик событий с кнопок.
function removeBtnsListener(){
  buttons.forEach(button => {
    button.removeEventListener('click', addBtnsListener)
  })
}


//Функция для смены языка. Дополнить. Привязать к правильным кнопкам.
btn.addEventListener('click', (evt) => {
  keyboardArea.classList.toggle('en');
  removeBtnsListener();
  createButtons(firstRow, firstRowBtnsEng);
  createButtons(secondRow, secondRowBtnsEng);
})



//Функции для специальных клавиш backspace etc.
function removeElement() {
  let currentText = textArea.value;
  if(currentText.length > 0){
    const newText = currentText.slice(0, -1);
    textArea.value = newText;
  }
}

