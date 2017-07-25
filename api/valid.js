module.exports = {
	user(user) {
		if(typeof(user.password) === 'string' && user.password.trim() != '') {
			if(typeof(user.email) === 'string' && user.email.trim() != '') {
				return true;
			}
		}
		return false;
	}
}
