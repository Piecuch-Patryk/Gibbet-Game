document.addEventListener('DOMContentLoaded', () => {
    let secretWord = 'Sssa',
        newTitle = '',
        imageNumber = 0,
        chances = 10,
        click = 0,
        count = '00',
        interval,
        m = '00',
        s = '00',
        ms = '00',
        timeResult = '00:00:00';
        isGameStarted = false;

    // show timre result on the end of game;
    const showTimeResult = () => {
        document.getElementById('game-time').innerHTML = timeResult;
    }
    // stopwatch;
    const stopwatch = () => {
        const el = document.getElementById('stopwatch');
        let time;
        count++
        ms = count;
        if(ms <= 9){
            ms = `0${ms}`;
        }
        if(ms >= 99){
            count = '00';
            s++
            if(s <= 9){
                s = `0${s}`;
            }
        }
        if(s >= 60){
            el.style.border = '.1rem solid rgba(200, 30, 30, .8)';
            setTimeout(() => {
                el.style.border = '.1rem solid rgba(0,0,0,0)';
            }, 500);
        }
        if(s >= 60){
            s = '00';
            m++;
            if(m <= 9){
                m = `0${m}`;
            }
        }       
        time = `${m}:${s}:${ms}`;
        timeResult = time;
        el.innerHTML = time;
    }
    // get new sentence from input;
    const getNewSentence = () => {
        const inputVal = document.getElementById('input'),
            stopwatchEl = document.getElementById('stopwatch');

        if(inputVal.value === '') return;
        secretWord = inputVal.value;
        inputVal.value = '';
        newTitle = '';
        imageNumber = 0;
        setSecretWord();
        setHint();
        showLayer('hide');
        changeImage();
        startGame();
        click = 0;
        stopwatchEl.innerHTML = timeResult;
    }
    // place hint of sentence;
    const setHint = () => {
        const hint = document.getElementById('hint');
        const container = document.getElementById('game-hint');
        container.innerText = hint.value;
        hint.value = '';
    }
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
    // change chances dynamically (10-0);
    const chancesLeft = () => {
        document.getElementById('game-chances').innerHTML = chances;
    }
    // change game image when wrong symbol choosen;
    const changeImage = () => {
        if(imageNumber >= 10){
            clearInterval(interval);
            showLayer('show', 'lose');
            return;
        }
        document.getElementById('game-image').style.backgroundImage = 'url(./img/gibbet' + imageNumber + '.png)';
        imageNumber++;
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
    const showLayer = (vis, str) => {
        const layerTitle = document.getElementById('layer-title'),
              layer = document.getElementById('top-layer'),
              resultTime = document.getElementById('game-result');
        let title = '',
            img = '';
        if(vis === 'show'){
            if(str === 'win'){
                layerTitle.classList.add('title-win');
                resultTime.classList.add('title-win');
                title = 'You Win!';
            }else {
                layerTitle.classList.add('title-loss');
                resultTime.classList.add('title-loss');
                title = 'You Loose!';
            }
            layerTitle.innerHTML = title;
            layer.style.backgroundImage = `url(${img})`;
            layer.style.display = 'block';
            document.getElementById('game-result').classList.add('animate-end-game');
            document.getElementById('game-result').classList.remove('opacity-hidden');
            showTimeResult();
        }else {
            // hide top layer;
            layer.style.display = 'none';
        }
    }
    // check if won game;
    const gameWon = () => {
        const title = document.getElementById('game-title').innerHTML;
        if(title.indexOf("_") < 0){
            clearInterval(interval);
            showLayer('show', 'win');
        }
    }
    // click digit/letter button;
    const clickButton = e => {
        if(!isGameStarted) return;
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
            // decrement and show chances left;
            chances--;
            chancesLeft();
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

    const startGame = () => {
        // start the stopwatch only after first click;
        if(click === 0){
            interval = setInterval(stopwatch, 10);
            click++;
            isGameStarted = true;
        }
    }

    // listen form submit with new sentence;
    document.getElementById('btn-play').addEventListener('click', getNewSentence);

    createButtons();
    setSecretWord();
    changeImage();
    chancesLeft();
    // refresh page button;
    document.querySelectorAll('.btn-refresh').forEach(el => {
        el.addEventListener('click', () => {
            location.reload();
        })
    });
});