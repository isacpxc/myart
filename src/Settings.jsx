import Sidebar from "./components/Sidebar";
import Main from "./components/Main"

function Settings() {
    const SettingsPage = () => {
        return (
            <>
                <button>mode</button>
                <br />
                <button>lang</button>
            </>
        );
    }

    return (
        <>
            <Sidebar />
            <Main page={<SettingsPage />} />
        </>
    );
}

export default Settings;