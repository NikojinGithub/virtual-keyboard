const page = document.querySelector('.page');

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


// const firstRowBtns = ['~', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace'];
const firstRowBtnsEng = [
  { item: '~', value: '~' },
  { item: '1', value: 1 },
  { item: '2', value: 2 },
  { item: '3', value: 3 },
  { item: '4', value: 4 },
  { item: '5', value: 5 },
  { item: '6', value: 6 },
  { item: '7', value: 7 },
  { item: '8', value: 8 },
  { item: '9', value: 9 },
  { item: '0', value: 0 },
  { item: '-', value: '-' },
  { item: '=', value: '=' },
  { item: 'backspace', value: '' },
];
const secondRowBtns = ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '/'];

//Функция создает элемент кнопку и вставляет ее в передаваемый контейнер(ряд кнопок).
function createButtons(container, array){
  array.forEach(i => {
    const button = document.createElement('div');
    button.classList.add('keyboard__btn');
    button.dataset.value = i.value;
    button.textContent = i.item;
    container.append(button);
  })
}

//Проходим по массиву рядов кнопок и вставляет кнопки из нужного массива(ряда) в зависимости от того какой ряд в данный момент.
keyboardRows.forEach((element, index) => {
  if(index === 0){
    createButtons(element, firstRowBtnsEng);
  }
});

//add classes to elements
header.classList.add('header');
main.classList.add('main');
textArea.classList.add('main__text');
keyboardArea.classList.add('keyboard');
footer.classList.add('footer');
keyboardRows.forEach(i => i.classList.add('keyboard__row'));

//add class to specific buttons
const firstRowLastBtn = firstRow.querySelector('.keyboard__btn:last-child');
firstRowLastBtn.classList.add('keyboard__btn_type_backspace');




renderElements(page, basicElements);
renderElements(main, mainElements);
renderElements(keyboardArea, keyboardRows);


//Появление символа в тестовом поле.

const buttons = document.querySelectorAll('.keyboard__btn');

buttons.forEach(button => {
  button.addEventListener('click', (evt) => {
    textArea.value += evt.target.dataset.value;

    if(evt.target.textContent === 'backspace'){
      removeElement();
    }
  })
})



//Функции для специальных клавиш backspace space etc.
function removeElement() {
  let currentText = textArea.value;
  if(currentText.length > 0){
    const newText = currentText.slice(0, -1);
    textArea.value = newText;
  }
}

