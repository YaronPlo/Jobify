import actions from "./actions";
const reducer = (state, action) => {
	if (action.type === actions.DISPLAY_ALERT) {
		return {
			...state,
			showAlert: true,
			alertType: "danger",
			alertText: "Please provide all values!",
		};
	} else if (action.type === actions.CLEAR_ALERT) {
		return {
			...state,
			showAlert: false,
			alertType: "",
			alertText: "",
		};
	}

	throw new Error(`No such action: ${action.type}`);
};

export default reducer;
