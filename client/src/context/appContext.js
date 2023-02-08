import { useReducer, useContext, createContext } from "react";
import actions from "./actions";
import reducer from "./reducer";
const initialState = {
	isLoading: false,
	showAlert: false,
	alertText: "",
	alertType: "",
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const displayAlert = () => {
		dispatch({ type: actions.DISPLAY_ALERT });
		clearAlert();
	};

	const clearAlert = () => {
		setTimeout(() => {
			dispatch({ type: actions.CLEAR_ALERT });
		}, 2000);
	};

	return (
		<AppContext.Provider value={{ ...state, displayAlert }}>
			{children}
		</AppContext.Provider>
	);
};
const useAppContext = () => {
	return useContext(AppContext);
};

export { initialState, AppProvider, useAppContext };
