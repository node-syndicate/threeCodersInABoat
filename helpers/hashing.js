const bcrypt = require('bcryptjs');

const create = (pass) => {
    return bcrypt.hash(pass, 8);
};

const compare = (pass, hash) => {
    return bcrypt.compareSync(pass, hash);
};

module.exports = { create, compare };
