import { useEffect, useState } from "react";
import { Alert, FormRow, Logo } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAppContext } from "../context/appContext";
import imgLogo from "../assets/images/logo.svg";

const initialState = {
	name: "",
	email: "",
	password: "",
	isMemeber: true,
};

const Register = () => {
	const { isLoading, showAlert, displayAlert } = useAppContext();
	const [values, setValues] = useState(initialState);

	const toggleMember = () => {
		setValues({ ...values, isMemeber: !values?.isMemeber });
	};

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		const { name, email, password, isMemeber } = values;
		if (!email || !password || (!isMemeber && !name)) {
			displayAlert();
			return;
		}
	};

	return (
		<Wrapper className="full-page">
			<form className="form" onSubmit={onSubmit}>
				<Logo logoSrc={imgLogo} alt="Jobify" className="logo" />
				<h3>{values.isMemeber ? "Login" : "Register"}</h3>
				{showAlert && <Alert />}
				{!values.isMemeber && (
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
				<button className="btn btn-block" type="submit">
					Submit
				</button>
				<p>
					{values.isMemeber ? "Not a member yet?" : "Already a member?"}
					<button className="member-btn" type="button" onClick={toggleMember}>
						Register
					</button>
				</p>
			</form>
		</Wrapper>
	);
};

export default Register;
