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

const firstRowBtns = ['~', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace'];
const secondRowBtns = ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '/'];

//Функция создает элемент кнопку и вставляет ее в передаваемый контейнер(ряд кнопок).
function createButtons(container, array){
  array.forEach(i => {
    const button = document.createElement('div');
    button.classList.add('keyboard__btn');
    button.textContent = i;
    container.append(button);
  })
}

//Проходим по массиву рядов кнопок и вставляет кнопки из нужного массива(ряда) в зависимости от того какой ряд в данный момент.
keyboardRows.forEach((element, index) => {
  if(index === 0){
    createButtons(element, firstRowBtns);
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