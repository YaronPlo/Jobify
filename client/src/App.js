import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Error404, Landing, Register, ProtectedRoute } from "./pages";
import {
	AllJobs,
	AddJob,
	Profile,
	SharedLayout,
	Stats,
} from "./pages/dashboard";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={
						<ProtectedRoute>
							<SharedLayout />
						</ProtectedRoute>
					}
				>
					<Route index element={<Stats />} />
					<Route path="all-jobs" element={<AllJobs />} />
					<Route path="add-job" element={<AddJob />} />
					<Route path="profile" element={<Profile />} />
				</Route>
				<Route path="/register" element={<Register />} />
				<Route path="/landing" element={<Landing />} />
				<Route path="*" element={<Error404 />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
