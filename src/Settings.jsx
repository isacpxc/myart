import Sidebar from "./components/Sidebar";
import Main from "./components/Main"
import { FaMoon } from "react-icons/fa";
import { FaRegSun } from "react-icons/fa6";
import { useEffect, useState } from "react";


function Settings() {
    const [theme, setTheme] = useState(0);

    useEffect(()=>{
        console.log(typeof localStorage.getItem('theme'))
        // if (localStorage.getItem('theme') == 'true') {setBrightTheme();setTheme(1)}
        // else setDarkTheme();
    },[])

    const setDarkTheme = () =>{
        // console.log("dentro do setDark");
        const root = document.querySelector(':root')
        root.style.setProperty("--color-primary", "#212226");
        root.style.setProperty("--color-secondary", "white");
        root.style.setProperty("--color-dark-blue", "#121317");
        // root.style.setProperty("--color-neon", "white");
    }

    const setBrightTheme = ()=>{
        // console.log("dentro do setBright");
        const root = document.querySelector(':root')
        root.style.setProperty("--color-primary", "white");
        root.style.setProperty("--color-primary", "white");
        root.style.setProperty("--color-secondary", "white");
        root.style.setProperty("--color-dark-blue", "white");
        root.style.setProperty("--color-neon", "white");
    }

    const handleSetTheme = ()=>{
        if (theme) setDarkTheme();
        else setBrightTheme();
        localStorage.setItem("theme",!theme)
        setTheme(!theme)
    }


    const SettingsPage = () => {
        if (theme == 0) return <div id="modal" style={{fontSize: "3vw", cursor: "pointer"}} onClick={handleSetTheme}><FaMoon/></div>;
        else return <div id="modal" style={{fontSize: "3vw", cursor: "pointer"}} onClick={handleSetTheme}><FaRegSun/></div>;
    }

    return (
        <>
            <Sidebar />
            <Main page={<SettingsPage />} idPage={"settings"} />
        </>
    );
}

export default Settings;