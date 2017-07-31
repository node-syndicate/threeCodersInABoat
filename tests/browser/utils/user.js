    const user = {
        username: 'testuser',
        password: 'Testuser1',
        confirmPassword: 'Testuser1',
        email: 'testuser@test.com',
        otherEmail: 'changed@mail.com',
        comment: 'test comment',
        editComment: 'edited test comment',
    };

const createUser = (ui) => {
    return Promise.resolve()
        .then(() => ui.click('#login-anchor'))
        .then(() => ui.click('#register-anchor'))
        .then(() => ui.setValue('input[name="username"]', user.username))
        .then(() => ui.setValue('input[name="password"]', user.password))
        .then(() => ui.setValue('input[name="confirmPassword"]',
            user.confirmPassword))
        .then(() => ui.setValue('input[name="email"]', user.email))
        .then(() => ui.click('#register-button'));
};

const loginUser = (ui) => {
    return Promise.resolve()
        .then(() => ui.click('#login-anchor'))
        .then(() => ui.setValue('input[name="username"]', user.username))
        .then(() => ui.setValue('input[name="password"]', user.password))
        .then(() => ui.click('#login-button'));
};

module.exports ={ createUser, loginUser, user };
