import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import ConnectedProfile from "./components/ConnectedProfile";
import NotConnectedProfile from "./components/NotConnectedProfile";

function Profile() {
    const [connected, setConnected] = useState(0);

    useEffect(()=>{
        if (localStorage.getItem('conn') != undefined) setConnected(1);
    },[connected]); // watching connection


    const ConnComponent = () => {
        if (localStorage.conn == undefined) {
            return <Main page={<NotConnectedProfile setConnected={setConnected} />} />;
        } else {
            return <Main page={<ConnectedProfile setConnected={setConnected}/>} />;   
        }
    }


    return (
        <>
            <Sidebar />
            <ConnComponent/>            
        </>
    );
}

export default Profile;