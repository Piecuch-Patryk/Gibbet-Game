document.addEventListener('DOMContentLoaded', () => {
    const closeHint = e => {
        const el = document.getElementById('game-hint');
        document.querySelector('.game-container').removeEventListener('mouseenter', closeHint);
        el.addEventListener('click', openHint);
        el.classList.remove('game-hint-animate', 'hide-before');
        el.classList.add('game-hint-hide');
        el.style.transform = 'translateX(99.5%)';
    }
    const openHint = e => {
        const el = document.getElementById('game-hint');
        el.removeEventListener('click', openHint);
        if(hasClass(el, 'game-hint-hide')){
            el.classList.remove('game-hint-hide');
        }
        el.classList.add('game-hint-animate');
        el.style.transform = 'translateX(0)';
        // hide question mark;
        el.classList.add('hide-before');
        // hide on mouseleave;
        document.querySelector('.game-container').addEventListener('mouseenter', closeHint);
    }
    const hasClass = (el, str) => {
        // search for given class;
        return (el.className.indexOf(str) > -1);
    }
    // listen click on the button hint of;
    document.getElementById('game-hint').addEventListener('click', openHint);
});