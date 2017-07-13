class User {
	constructor(username, email, password) {
		this.username = username;
		this.email = email;
		this.password = password;
	}
	register() {
		// db set this.username && db set this.email && db set this.password
	}
}


module.exports = User;