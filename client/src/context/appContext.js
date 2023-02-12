import { useReducer, useContext, createContext } from "react";
import axios from "axios";
import actions from "./actions";
import reducer from "./reducer";

const user = localStorage.getItem("user");
const token = localStorage.getItem("token");
const userLocation = localStorage.getItem("location");

const initialState = {
	isLoading: false,
	showAlert: false,
	alertText: "",
	alertType: "",
	user: user ? JSON.parse(user) : null,
	token,
	userLocation: userLocation || "",
	jobLocation: userLocation || "",
};

const AppContext = createContext();
const apiV1 = "/api/v1";
const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const addUserToLocalStorage = ({ user, token, location }) => {
		localStorage.setItem("user", JSON.stringify(user));
		localStorage.setItem("token", token);
		localStorage.setItem("location", location);
	};

	const removeUserToLocalStorage = ({ user, token, location }) => {
		localStorage.removeItem("user");
		localStorage.removeItem("token");
		localStorage.removeItem("location");
	};

	const displayAlert = () => {
		dispatch({ type: actions.DISPLAY_ALERT });
		clearAlert();
	};

	const clearAlert = () => {
		setTimeout(() => {
			dispatch({ type: actions.CLEAR_ALERT });
		}, 3000);
	};

	const setupUser = async ({ currentUser, endPoint, alertText }) => {
		dispatch({ type: actions.SETUP_USER_BEGIN });
		try {
			console.log(currentUser);
			const { data } = await axios.post(
				`${apiV1}/auth/${endPoint}`,
				currentUser
			);
			const { user, token, location } = data;

			dispatch({
				type: actions.SETUP_USER_SUCCESS,
				payload: { user, token, location, alertText },
			});
			addUserToLocalStorage({ user, token, location });
		} catch (error) {
			dispatch({
				type: actions.SETUP_USER_ERROR,
				payload: { msg: error.response.data.msg },
			});
		}
		clearAlert();
	};

	return (
		<AppContext.Provider value={{ ...state, displayAlert, setupUser }}>
			{children}
		</AppContext.Provider>
	);
};
const useAppContext = () => {
	return useContext(AppContext);
};

export { initialState, AppProvider, useAppContext };
