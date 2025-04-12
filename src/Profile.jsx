import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";

function Profile() {
    const [connected, setConnected] = useState(0);

    const NotConnectedProfile = () => {
        return (
            <>
                <span>Not Connected</span>
                <br />
                <button>Login With Metamask</button>
                <br />
                <button onClick={() => {
                    setConnected(!connected);
                }}>changeState</button>
            </>
        );
    }

    const ConnectedProfile = () => {
        return (
            <>
                <span>Address: </span><input type="text" name="" id="" disabled />
                <br />
                <span>balance:</span> <input type="text" disabled />
                <button onClick={() => { updateBalance(3) }}>Refresh Balance</button>
                <br />
                <span>My Collection:</span> <button onClick={() => { alert('work') }}>Add</button>
                <br />
                <div className="hold-test-blocks">
                    {/* <div className="test-block"></div> */}
                </div>
                <button onClick={() => {
                    setConnected(!connected);
                }}>changeState</button>
            </>
        );
    } // end of ConnectedProfile

    const updateBalance = (par) => {
        alert('work' + par);
    }


    return (
        <>

            <Sidebar />
            {connected ? <Main page={<ConnectedProfile />} /> : <Main page={<NotConnectedProfile />} />}

        </>
    );
}

export default Profile;