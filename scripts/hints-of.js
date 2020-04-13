document.addEventListener('DOMContentLoaded', () => {
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
    }
    const hasClass = (el, str) => {
        // search for given class;
        return (el.className.indexOf(str) > -1);
    }
    // listen click on the button hint of;
    document.getElementById('game-hint').addEventListener('click', openHint);
});