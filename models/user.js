const bcrypt = require('bcryptjs');

class User {
	constructor(username, email, password) {
		this.username = username;
		this.email = email;
		this.password = password;
	}
	register(db) {
		// db set this.username && db set this.email && db set this.password
	}
}

const USERS_COLLECTION = 'users';

module.exports.findByUsername = (db, user) => {
	db.collection(USERS_COLLECTION)
		.findOne(
			{ username: user.username }
		);
};
