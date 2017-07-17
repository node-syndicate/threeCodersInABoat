const register = (req) => {
    req.checkBody('user_name', 'Username is missing.').notEmpty();
    req.checkBody('user_name', 'The username must be between 6 and 10 symbols and include only letters, numbers and underscores.')
        .matches(/\S[_a-zA-Z0-9]{5,10}/);
    req.checkBody('user_password', 'Password is missing.').notEmpty();
    req.checkBody('user_password', 'The password must be at least 6 symbols long and contain at least one uppercase, lowercase and a number.').matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}/);
    req.checkBody('user_password', 'Passwords do not match.').equals(req.body.confirm_password);
    req.checkBody('email', 'Email is badly formated.').isEmail();


    return req.getValidationResult(); // returns promise with all the errors
};


module.exports = {
    register,
};
