import { useEffect } from "react";
const Dashboard = () => {
	const fetchData = async (signal) => {
		try {
			const resp = await fetch("/api/v1", { signal });
			const data = await resp.json();
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		let controller = new AbortController();
		fetchData(controller.signal);
		return () => controller.abort();
	}, []);

	return <h1>Dashboard</h1>;
};
export default Dashboard;
