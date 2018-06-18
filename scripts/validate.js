
// validate input;
const validate = e => {
    const el = e.target,
          regExp = new RegExp("^([a-zA-Z0-9]+)$");
    el.addEventListener('keydown', () => {
        if((el.value != '') && (!regExp.test(el.value))){
            const length = el.value.length;
            let newVal = '';
            newVal = el.value.substring(0, length -1);
            el.value = newVal;
//            document.querySelector('.input-notice').classList.add('error-active');
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