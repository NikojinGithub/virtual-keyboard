const page = document.querySelector('.page');

//create elements
const header = document.createElement('header');
const main = document.createElement('main');
const textArea = document.createElement('textarea');
const keyboardArea = document.createElement('section');
const footer = document.createElement('footer');

const basicElements = [header, main, footer];
const mainElements = [keyboardArea, textArea];

//functions
function renderElements(area, array){
  array.forEach(i => area.prepend(i))
}

function createSmallButtons(obj){

}


//add classes to elements
header.classList.add('header');
main.classList.add('main');
textArea.classList.add('main__text');
keyboardArea.classList.add('keyboard');
footer.classList.add('footer');



renderElements(page, basicElements);
renderElements(main, mainElements);