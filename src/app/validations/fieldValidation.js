const orderid = require('order-id')('secret1234');

class FieldValidation {
    restrictNumber(value) {
        return new Promise((resolve, reject) => {
            if (/\d/.test(value)) reject('Number is not allowed');
            resolve(true);
        });
    }

    restrictSpecialChar(value) {
        return new Promise((resolve, reject) => {
            if (/[^a-zA-Z0-9 ]/.test(value)) reject('Special Characters not allowed');
            resolve(true);
        });
    }


    titleCase(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    validateEmail(value) {
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)) {
            return (true)
        }
        return (false)
    }

    generateOrderNumber() {
        return orderid.generate();
    }


    getName(string) {
        return string.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
    }
}

export default (new FieldValidation());