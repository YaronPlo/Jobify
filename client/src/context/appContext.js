import { useReducer, useContext, createContext } from "react";
import axios from "axios";
import actions from "./actions";
import reducer from "./reducer";
const initialState = {
	isLoading: false,
	showAlert: false,
	alertText: "",
	alertType: "",
	user: null,
	token: null,
	userLocation: "",
	jobLocation: "",
};

const AppContext = createContext();
const apiV1 = "/api/v1";
const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const displayAlert = () => {
		dispatch({ type: actions.DISPLAY_ALERT });
		clearAlert();
	};

	const clearAlert = () => {
		setTimeout(() => {
			dispatch({ type: actions.CLEAR_ALERT });
		}, 3000);
	};

	const registerUser = async (currUser) => {
		dispatch({ type: actions.REGISTER_USER_BEGIN });
		try {
			const response = await axios.post(`${apiV1}/auth/register`, currUser);
			// console.log(response);
			const { user, token, location } = response.data;
			dispatch({
				type: actions.REGISTER_USER_SUCCESS,
				payload: { user, token, location },
			});
		} catch (error) {
			// console.log(error.response);
			dispatch({
				type: actions.REGISTER_USER_ERROR,
				payload: { msg: error.response.data.msg },
			});
		}

		clearAlert();
	};

	return (
		<AppContext.Provider value={{ ...state, displayAlert, registerUser }}>
			{children}
		</AppContext.Provider>
	);
};
const useAppContext = () => {
	return useContext(AppContext);
};

export { initialState, AppProvider, useAppContext };
