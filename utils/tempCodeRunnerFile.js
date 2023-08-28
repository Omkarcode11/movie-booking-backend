function CheckPassword(str) {
    var passw = new RegExp(/^[A-Za-z]\w{7,14}$/);
    if (str.value.match(passw)) {
        return true;
    }
    else {
        return false;
    }
}

console.log(CheckPassword("omkar"))