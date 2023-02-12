import { useEffect, useState } from "react";
import { Alert, FormRow, Logo } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";

const initialState = {
	name: "",
	email: "",
	password: "",
	isMember: true,
};

const Register = () => {
	const navigate = useNavigate();
	const { user, isLoading, showAlert, displayAlert, setupUser } =
		useAppContext();
	const [values, setValues] = useState(initialState);

	const toggleMember = () => {
		setValues({ ...values, isMember: !values?.isMember });
	};

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		const { name, email, password, isMember } = values;
		if (!email || !password || (!isMember && !name)) {
			displayAlert();
			return;
		}

		const currentUser = { name, email, password };
		if (isMember) {
			setupUser({
				currentUser,
				endPoint: "login",
				alertText: "Login Successful! Redirecting...",
			});
		} else {
			setupUser({
				currentUser,
				endPoint: "register",
				alertText: "User Created! Redirecting...",
			});
		}
	};

	useEffect(() => {
		if (user) {
			setTimeout(() => {
				navigate("/");
			}, 3000);
		}
	}, [user, navigate]);

	return (
		<Wrapper className="full-page">
			<form className="form" onSubmit={onSubmit}>
				<Logo />
				<h3>{values.isMember ? "Login" : "Register"}</h3>
				{showAlert && <Alert />}
				{!values.isMember && (
					<FormRow
						type="text"
						name="name"
						value={values.name}
						handleChange={handleChange}
						labelText="Name"
					/>
				)}
				<FormRow
					type="email"
					name="email"
					value={values.email}
					handleChange={handleChange}
					labelText="Email"
				/>
				<FormRow
					type="password"
					name="password"
					value={values.password}
					handleChange={handleChange}
					labelText="Password"
				/>
				<button className="btn btn-block" type="submit" disabled={isLoading}>
					Submit
				</button>
				<p>
					{values.isMember ? "Not a member yet?" : "Already a member?"}
					<button className="member-btn" type="button" onClick={toggleMember}>
						{values.isMember ? "Register" : "Login"}
					</button>
				</p>
			</form>
		</Wrapper>
	);
};

export default Register;
