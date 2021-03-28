'use strict';

const bcrypt = require('bcryptjs-then');

module.exports = {
    checkPassword: (str) => {
        var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/;
        var auth_pass = re.test(str);
        if (!auth_pass) {
            return {
                IsNot: false,
                msg: 'Format password is not allowed.'
            }
        }
        return true;
    },
    hashPass: async (user_pass) => {
        return bcrypt.hash(user_pass, 10);
    },
    compareHashPass: async (hash, pass) => {
        return bcrypt.compare(hash, pass);
    }
}