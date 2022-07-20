// use ascii table to determine character codes for lowercase, uppercase and numbers. 
export class PasswordService{

    // floor character is 'a' with code 97
    static getRandomLowerCase() {
        return String.fromCharCode(Math.floor(Math.random() * 26) + 97);

    }
    // floor character is 'A' with code 65
    static getRandomUpperCase() {
        return String.fromCharCode(Math.floor(Math.random() * 26) + 65);

    }
    // floor character is '0' with code 48
    static getRandomNumbers() {
        return String.fromCharCode(Math.floor(Math.random() * 10) + 48);

    }
    // store our own symbol selections in a variable then randomize
    static getRandomSymbols() {
        let symbolString = `!@#$%^&*(){}[]/`;
        return symbolString[Math.floor(Math.random() * symbolString.length)];
    }

    // determines what checkboxes were selected and what to return based off user input
    static getPasswordObj(state) {
        let passwordObj = {};
    // loop through object which consists of key-value pairs
        for(let key of Object.keys(state)) {
    // if input is a boolean - it is our checkboxes && it is checked/true, pull from the objects which are selected
            if(typeof state[key] === 'boolean' && state[key] === true) {
                passwordObj = {
                    ...passwordObj,
                    [key] : state[key]
                }
            }
        }
        return passwordObj;
    }

    static generatePassword(passwordObj , passwordLength) {
        let password = '';
    // loop as many times as user declares password length and increment passwordObject if user checked the box
        for(let i = 0; i < Number(passwordLength); i+= Object.keys(passwordObj).length) {
            // if passwordObj contains lower, get random lowercase and add to generated password and so forth.
            if(passwordObj.lower) password += `${this.getRandomLowerCase()}`;
            if(passwordObj.upper) password += `${this.getRandomUpperCase()}`;
            if(passwordObj.number) password += `${this.getRandomNumbers()}`;
            if(passwordObj.symbol) password += `${this.getRandomSymbols()}`;
        }
        return password;
    }
}