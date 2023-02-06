import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard, Error404, Landing, Register } from "./pages";
const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Dashboard />} />
				<Route path="/register" element={<Register />} />
				<Route path="/landing" element={<Landing />} />
				<Route path="*" element={<Error404 />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
