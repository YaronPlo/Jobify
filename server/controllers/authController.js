const register = async (req, res) => {
	return res.send("Register User");
};
const login = async (req, res) => {
	return res.send("Login User");
};
const updateUser = async (req, res) => {
	return res.send("Update User");
};
export { register, login, updateUser };
