const errorHandlerMiddleware = (err, req, res, mext) => {
	console.error(err);
	return res.status(500).json({ msg: "There was an Error!" });
};

export default errorHandlerMiddleware;
