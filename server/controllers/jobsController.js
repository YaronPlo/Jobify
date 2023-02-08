const createJob = async (req, res) => {
	return res.send("Create Job");
};

const deleteJob = async (req, res) => {
	return res.send("Delete Job");
};

const getAllJobs = async (req, res) => {
	return res.send("Get All Jobs");
};

const updateJob = async (req, res) => {
	return res.send("Update Job");
};

const showStats = async (req, res) => {
	return res.send("Show Stats Job");
};

export { createJob, deleteJob, getAllJobs, updateJob, showStats };
