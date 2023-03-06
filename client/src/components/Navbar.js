import { useState } from "react";
import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import Logo from "./Logo";
import { useAppContext } from "../context/appContext";

const Navbar = () => {
	const { user, toggleSidebar, logoutUser } = useAppContext();
	const [showLogout, setShowLogout] = useState(false);
	return (
		<Wrapper>
			<div className="nav-center">
				<button className="toggle-btn" onClick={toggleSidebar}>
					<FaAlignLeft />
				</button>
				<div>
					<Logo />
					<h3 className="logo-text">Dashboard</h3>
				</div>
				<div className="btn-container">
					<button
						type="button"
						className="btn"
						onClick={() => setShowLogout(!showLogout)}
					>
						<FaUserCircle />
						{user?.name}
						<FaCaretDown />
					</button>
					<div className={`dropdown ${showLogout && "show-dropdown"}`}>
						<button type="button" className="dropdown-btn" onClick={logoutUser}>
							Logout
						</button>
					</div>
				</div>
			</div>
		</Wrapper>
	);
};
export default Navbar;
