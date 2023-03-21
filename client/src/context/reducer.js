import actions from "./actions";
import { initialState } from "./appContext";
const reducer = (state, action) => {
	switch (action.type) {
		case actions.DISPLAY_ALERT:
			return {
				...state,
				showAlert: true,
				alertType: "danger",
				alertText: "Please provide all values!",
			};
		case actions.CLEAR_ALERT:
			return {
				...state,
				showAlert: false,
				alertType: "",
				alertText: "",
			};
		case actions.UPDATE_USER_BEGIN:
		case actions.SETUP_USER_BEGIN:
			return { ...state, isLoading: true };
		case actions.UPDATE_USER_SUCCESS:
		case actions.SETUP_USER_SUCCESS:
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
		case actions.UPDATE_USER_ERROR:
		case actions.SETUP_USER_ERROR:
			return {
				...state,
				isLoading: false,
				showAlert: true,
				alertType: "danger",
				alertText: action.payload.msg,
			};
		case actions.TOGGLE_SIDEBAR:
			return {
				...state,
				showSidebar: !state.showSidebar,
			};
		case actions.LOGOUT_USER:
			return {
				...initialState,
				user: null,
				token: null,
				userLocation: "",
				jobLocation: "",
			};

		default:
			throw new Error(`No such action: ${action.type}`);
	}
};

export default reducer;
