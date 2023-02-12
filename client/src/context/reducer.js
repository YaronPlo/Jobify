import actions from "./actions";
const reducer = (state, action) => {
	if (action.type === actions.DISPLAY_ALERT) {
		return {
			...state,
			showAlert: true,
			alertType: "danger",
			alertText: "Please provide all values!",
		};
	}
	if (action.type === actions.CLEAR_ALERT) {
		return {
			...state,
			showAlert: false,
			alertType: "",
			alertText: "",
		};
	}
	if (action.type === actions.SETUP_USER_BEGIN) {
		return { ...state, isLoading: true };
	}
	if (action.type === actions.SETUP_USER_SUCCESS) {
		return {
			...state,
			isLoading: false,
			token: action.payload.token,
			user: action.payload.user,
			userLocation: action.payload.userLocation,
			jobLocation: action.payload.location,
			showAlert: true,
			alertType: "success",
			alertText: action.payload.alertText,
		};
	}
	if (action.type === actions.SETUP_USER_ERROR) {
		return {
			...state,
			isLoading: false,
			showAlert: true,
			alertType: "danger",
			alertText: action.payload.msg,
		};
	}

	throw new Error(`No such action: ${action.type}`);
};

export default reducer;
