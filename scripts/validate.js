
// validate input;
const validate = e => {
    const el = e.target,
    regExp = new RegExp("^[A-Za-z0-9? ,_-]+$");
    el.addEventListener('keyup', (ev) => {
        if(!regExp.test(el.value)){
            const length = el.value.length;
            let newVal = '';
            newVal = el.value.substring(0, length -1);
            el.value = newVal;
            document.querySelector('.input-notice').classList.add('error-active');
        }else {
            if(ev.keyCode != 16){
                // hide error;
                document.querySelector('.input-notice').classList.remove('error-active');
            }
        }
    });
}

// do something when focus on inputs;
document.querySelectorAll('.input-field input').forEach(el => {
    el.addEventListener('focus', e => {
        // valiadate inputed value;
        validate(e);
    });
});