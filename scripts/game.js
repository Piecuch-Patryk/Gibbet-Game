let secretWord = 'Simple password',
    newTitle = '',
    imageNumber = 0;
// get new sentence from input;
const getNewSentence = () => {
    const inputVal = document.getElementById('input'),
        inputError = document.querySelector('.input-notice'),
        // only letters and digits;
        pattern = new RegExp(/^([a-zA-Z0-9 ]+)$/);
    inputError.style.display = 'none';
    if(pattern.test(inputVal.value)){
        secretWord = inputVal.value;
        inputVal.value = '';
        newTitle = '';
        imageNumber = 0;
        setSecretWord();
        changeImage();
    }else {
        inputError.style.display = 'block';
    }
}
// listen form submit with new sentence;
document.getElementById('btn-play').addEventListener('click', getNewSentence);
// place secret word as a hidden game title;
const setSecretWord = () => {
    let hiddenSecretWord = [];
    for(let i = 0; i < secretWord.length; i++){
        if(secretWord[i] === ' '){
            hiddenSecretWord.push(' ');
        }else {
            hiddenSecretWord.push('_');
        }
    }
    hiddenSecretWord = hiddenSecretWord.join('');
    document.getElementById('game-title').innerHTML = hiddenSecretWord;
}
// change game image when wrong symbol choosen;
const changeImage = () => {
    document.getElementById('game-image').style.backgroundImage = 'url(./img/gibbet' + imageNumber + '.png)';
    imageNumber++;
    if(imageNumber > 10){
        showLayer('loss');
    }
}
// show found symbol;
const showSymbol = (str, num) => {
    const currentTitle = document.getElementById('game-title').innerHTML;
    newTitle = currentTitle.substring(0, num) + str + currentTitle.substring(num + 1);
    document.getElementById('game-title').innerHTML = newTitle;
}
// check if clicked symbol exist in hidden sentence;
const symbolExist = str => {
    const wordLength = secretWord.toLowerCase().split('');
    let found = [];
    wordLength.forEach((el, i) => {
        if(str == el){
            // show current symbol in game title;
            showSymbol(str, i);
            found.push(el + i);
        }
    });
    return found.length;
}
// show top-layer winner/looser;
const showLayer = str => {
    const layerTitle = document.getElementById('layer-title'),
          layer = document.getElementById('top-layer');
    let title = '';
    if(str === 'win'){
        layerTitle.classList.add('title-win');
        title = 'You Win!';
    }else {
        layerTitle.classList.add('title-loss');
        title = 'You Loose!';
    }
    layerTitle.innerHTML = title;
    layer.style.display = 'block';
}
// check if won game;
const gameWon = () => {
    const title = document.getElementById('game-title').innerHTML;
    if(title.indexOf("_") < 0){
        showLayer('win');
    }
}
// click digit/letter button;
const clickButton = e => {
    const currentSymbol = e.target.innerHTML.toLowerCase(),
        currentEl = e.target;
    currentEl.removeEventListener('click', clickButton);
    // check if symbol exist in hidden word;
    if(symbolExist(currentSymbol) > 0){
        // mark symbol on green;
        currentEl.classList.remove('active');
        currentEl.classList.add('btnSuccess');
        // check if player won game;
        gameWon();
    }else {
        // mark symbol on red;
        currentEl.classList.remove('active');
        currentEl.classList.add('btnError');
        // change game image - gibbet;
        changeImage();
    }
}
// create buttons - letters and digits;
const createButtons = () => {
    const gameButtons = document.getElementById('game-buttons');
    let digitsLetters = ['ABCDEFGHIJKLMNOPQRSTUWVXYZ0123456789'],
        symbolsArray = [];
    digitsLetters = digitsLetters.forEach(el => {
        symbolsArray = el.split('');
    });
    // append buttons to body;
    symbolsArray.forEach(el => {
        const button = document.createElement('button');
        button.classList.add('symbol', 'active');
        button.innerHTML = el;
        gameButtons.appendChild(button);
        button.addEventListener('click', clickButton);
    });
}
document.addEventListener('DOMContentLoaded', () => {
    createButtons();
    setSecretWord();
    changeImage();
    // refresh page button;
    document.querySelectorAll('.btn-refresh').forEach(el => {
        el.addEventListener('click', () => {
            location.reload();
        })
    });
});