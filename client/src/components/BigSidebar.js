import Wrapper from "../assets/wrappers/BigSidebar";
import { Logo, NavLinks } from ".";
import { useAppContext } from "../context/appContext";
const BigSidebar = () => {
	const { showSidebar, toggleSidebar } = useAppContext();
	return (
		<Wrapper>
			<div className={`sidebar-container ${showSidebar ? "show-sidebar" : ""}`}>
				<div className="content">
					<header>
						<Logo />
					</header>
					<NavLinks toggleSidebar={toggleSidebar} />
				</div>
			</div>
		</Wrapper>
	);
};
export default BigSidebar;
