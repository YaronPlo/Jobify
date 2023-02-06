import { Link } from "react-router-dom";
import img404 from "../assets/images/not-found.svg";
import Wrapper from "../assets/wrappers/ErrorPage";
const Error404 = () => {
	return (
		<Wrapper className="full-page">
			<div>
				<img src={img404} alt="page not found - 404" />
				<h3>Ohh... Page not found :(</h3>
				<p>We can't seem to find the page you're looking for</p>
				<Link to="/">Back home</Link>
			</div>
		</Wrapper>
	);
};

export default Error404;
