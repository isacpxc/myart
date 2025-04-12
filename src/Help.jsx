import Sidebar from "./components/Sidebar";
import Main from "./components/Main"
import HowToUse from "./components/HowToUse"
import { useEffect } from "react";

function Help() {

    const HelpPage = () => {
        return (
            <>
                <h1>How to Use</h1>
                <br /><br />
                <div id="markdown-container">
                    <HowToUse />
                </div >
            </>
        );
    }

    return (
        <>
            <Sidebar />
            <Main page={<HelpPage />} specialStyle={{ display: "flex", flexDirection: "column", alignItems: "center" }} />
        </>
    );
}

export default Help;