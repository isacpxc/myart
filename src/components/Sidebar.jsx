import { FaHome } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { CiCircleQuestion } from "react-icons/ci";
import { FaGear } from "react-icons/fa6";
import { NavLink } from "react-router";

function Sidebar() {
    const iconSize = 30;
    return (
        <nav className="fixed flex justify-between top-0 left-0 h-screen w-16 m-0 flex flex-col bg-primary text-secondary">
            <div className="">
                <NavLink to="/" className="!mb-10">
                    <SideBarIcon icon={<FaHome size={iconSize} />} text="Home" mb="!mb-5" mt="!mt-2" />
                </NavLink>
                <NavLink to="/profile">
                    <SideBarIcon icon={<CgProfile size={iconSize} />} text="Profile" mb="!mb-0" mt="" />
                </NavLink>
            </div>
            <div className="">
                <NavLink to="/settings">
                    <SideBarIcon icon={<FaGear size={iconSize} />} text="Settings" mb="!mb-5" mt="" />
                </NavLink>
                <NavLink to="/help">
                    <SideBarIcon icon={<CiCircleQuestion size={iconSize} />} text="Help" mb="!mb-2" mt="" />
                </NavLink>
            </div>
        </nav>
    );
}

const SideBarIcon = ({ icon, text, mb, mt }) => (
    <div className={"sidebar-icon group " + mb + " " + mt} >
        {icon}

        <span className="sidebar-tooltip group-hover:scale-150">
            {text}
        </span>
    </div>
);

export default Sidebar;