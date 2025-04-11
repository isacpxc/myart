/* eslint-disable no-unused-vars */
import { FaHome } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { CiCircleQuestion } from "react-icons/ci";
import { FaGear } from "react-icons/fa6";
import { NavLink } from "react-router";
import "./sidebar.css"

function Sidebar() {
    const iconSize = 30;
    return (
        <nav className="sidebar">
            <div className="sidebar-section">
                <NavLink to="/">
                    <SideBarIcon icon={<FaHome /*size={iconSize}*/ />} text="Home" top="10px" />
                </NavLink>
                <NavLink to="/profile">
                    <SideBarIcon icon={<CgProfile /*size={iconSize}*/ />} text="Profile" />
                </NavLink>
            </div>
            <div className="sidebar-section">
                <NavLink to="/settings">
                    <SideBarIcon icon={<FaGear /*size={iconSize}*/ />} text="Settings" />
                </NavLink>
                <NavLink to="/help">
                    <SideBarIcon icon={<CiCircleQuestion /*size={iconSize}*/ />} text="Help" />
                </NavLink>
            </div>
        </nav>
    );
}

const SideBarIcon = ({ icon, text, top }) => (
    <div className={"sidebar-icon"} style={{ marginTop: top }}>
        {icon}

        <span className="subtitle-blink">
            {text}
        </span>
    </div>
);

export default Sidebar;