const register = (req) => {
    req.checkBody('user_name', 'invalid username').notEmpty();


   return req.getValidationResult(); // returns promise with all the errors
};


module.exports = {
    register,
 };
