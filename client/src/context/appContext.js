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
	token: token,
	userLocation: userLocation || "",
	jobLocation: userLocation || "",
	showSidebar: false,
};

const AppContext = createContext();
const apiV1 = "/api/v1";

const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	//Axios instance
	const authFetch = axios.create({
		baseURL: `${apiV1}/auth`,
	});
	//req
	authFetch.interceptors.request.use(
		(config) => {
			config.headers["Authorization"] = `Bearer ${state.token}`;
			return config;
		},
		(error) => {
			return Promise.reject(error);
		}
	);

	//res
	authFetch.interceptors.response.use(
		(response) => {
			return response;
		},
		(error) => {
			console.log(error.response);
			if (error.response.status === 401) console.log("AUTH ERROR");
			return Promise.reject(error);
		}
	);

	const addUserToLocalStorage = ({ user, token, location }) => {
		localStorage.setItem("user", JSON.stringify(user));
		localStorage.setItem("token", token);
		localStorage.setItem("location", location);
	};

	const removeUserToLocalStorage = () => {
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

	const toggleSidebar = () => {
		dispatch({ type: actions.TOGGLE_SIDEBAR });
	};

	const logoutUser = () => {
		dispatch({ type: actions.LOGOUT_USER });
		removeUserToLocalStorage();
	};

	const updateUser = async ({ currentUser, alertText }) => {
		dispatch({ type: actions.UPDATE_USER_BEGIN });
		try {
			const { data } = await authFetch.patch("/updateUser", currentUser);
			const { user, location, token } = data;
			dispatch({
				type: actions.UPDATE_USER_SUCCESS,
				payload: {
					user,
					location,
					token,
					alertText,
				},
			});
			addUserToLocalStorage({ user, location, token });
		} catch (error) {
			dispatch({
				type: actions.UPDATE_USER_ERROR,
				payload: { msg: error.response.data.msg },
			});
		}
	};

	return (
		<AppContext.Provider
			value={{
				...state,
				displayAlert,
				setupUser,
				toggleSidebar,
				updateUser,
				logoutUser,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
const useAppContext = () => {
	return useContext(AppContext);
};

export { initialState, AppProvider, useAppContext };
