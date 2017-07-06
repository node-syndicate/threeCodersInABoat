const usersList = [
	{
		id: 1,
		username: 'Cuki',
		password: 'mrazq_windows',
	},
];

const users = {
	findById(id) {
		id = parseInt(id, 10);
		const userId = usersList.find((u) => u.id === id);
		return new Promise((res, rej) => {
			if (!id) {
				return rej('no such user');
			}
			return res(id);
		});
	},
	findByUsername(username) {
		const usernameToLower = username.toLowerCase();
		const user = usersList.find(
			(u) => u.username.toLowerCase() === usernameToLower
		);
		return new Promise((res, rej) => {
			if (!user) {
				return rej('no such user');
			}
			return res(user);
		});
	},
};

const newsList = []; // not used anywhere

module.exports = {
	users,
	newsList,
};
