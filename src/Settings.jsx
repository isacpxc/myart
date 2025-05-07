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

    // const setDarkTheme = () =>{
    //     // console.log("dentro do setDark");
    //     const root = document.querySelector(':root')
    //     root.style.setProperty("--color-bg", "#121317");
    //     root.style.setProperty("--color-transparent-bg", "#12131782");
    //     root.style.setProperty("--color-primary", "#212226");
    //     root.style.setProperty("--color-border", "#272B2E");
    //     root.style.setProperty("--color-text", "#9FA0A4");
    //     root.style.setProperty("--color-emphasis-d", "#1f1241");
    //     root.style.setProperty("--color-emphasis-b", "#fff");
    //     root.style.setProperty("--color-btn", "#3D4C53");
    //     root.style.setProperty("--color-btn-text", "#C8E3DA");
    //     root.style.setProperty("--color-btn-buy-active", "");
    //     root.style.setProperty("--color-red", "#BE2A2A");
    //     root.style.setProperty("--color-coin", "#EFAE16");
    //     root.style.setProperty("--color-confirm", "rgb(96, 224, 41)");
        
    //     // root.style.setProperty("--color-neon", "white");
    // }

    // const setBrightTheme = ()=>{
    //     // console.log("dentro do setBright");
    //     const root = document.querySelector(':root')
    //     root.style.setProperty("--color-bg", "#FFFCF7");
    //     root.style.setProperty("--color-transparent-bg", "#12131782");
    //     root.style.setProperty("--color-primary", "#EE850F");
    //     root.style.setProperty("--color-border", "#D8D8D6");
    //     root.style.setProperty("--color-text", "#FFF");
    //     root.style.setProperty("--color-emphasis-d", "#1f1241");
    //     root.style.setProperty("--color-emphasis-b", "#fff");
    //     root.style.setProperty("--color-btn", "#FFFCF7");
    //     root.style.setProperty("--color-btn-text", "#FFF");
    //     root.style.setProperty("--color-btn-buy-active", "");
    //     root.style.setProperty("--color-red", "#BE2A2A");
    //     root.style.setProperty("--color-coin", "#EFAE16");
    //     root.style.setProperty("--color-confirm", "#EE850F");
    //     root.style.setProperty("--color-neon", "white");
    // }

    const handleSetTheme = ()=>{
        if (theme) setDarkTheme();
        else setBrightTheme();
        localStorage.setItem("theme",!theme)
        setTheme(!theme)
    }


    const SettingsPage = () => {
        if (theme == 0) return <div id="modal"  style={{fontSize: "3vw", cursor: "pointer"}} onClick={()=>{alert("Not implemented")}}><FaMoon/></div>;
        else return <div id="modal" style={{fontSize: "3vw", cursor: "pointer"}} onClick={()=>{alert("Not implemented")}}><FaRegSun/></div>;
    }

    return (
        <>
            <Sidebar />
            <Main page={<SettingsPage />} idPage={"settings"} />
        </>
    );
}

export default Settings;