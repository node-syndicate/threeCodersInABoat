const register = (req) => {
    req.checkBody('username',
                    'Username is missing.')
                    .notEmpty();
    req.checkBody('username',
                    `The username must be between 6 and 10 symbols 
                    and include only letters, numbers and underscores.`)
                    .matches(/\S[_a-zA-Z0-9]{5,10}/);
    req.checkBody('password', 'Password is missing.').notEmpty();
    req.checkBody('password',
                    `The password must be at least 6 symbols long and 
                    contain at least one uppercase, lowercase and a number.`)
                    .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}/);
    req.checkBody('password', 'Passwords do not match.')
                    .equals(req.body.confirmPassword);
    req.checkBody('email', 'Email is badly formated.').isEmail();

    return req.getValidationResult(); // returns promise with all the errors
};

const login = (req) => {
    req.checkBody('username', 'Username is missing.').notEmpty();
    req.checkBody('password', 'Password is missing.').notEmpty();

    return req.getValidationResult(); // returns promise with all the errors
};

const edit = (req) => {
    req.checkBody('email', 'Please enter an email.').notEmpty();
    req.checkBody('email', 'Email is badly formated.').isEmail();
    return req.getValidationResult(); // returns promise with all the errors
};

module.exports = {
    register,
    login,
    edit,
};
