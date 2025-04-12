import Sidebar from "./components/Sidebar";
import Main from "./components/Main"

function Help() {
    const HelpPage = () => {
        return (
            <>
                <span>How to Use</span>
            </>
        );
    }

    return (
        <>
            <Sidebar />
            <Main page={<HelpPage />} />
        </>
    );
}

export default Help;