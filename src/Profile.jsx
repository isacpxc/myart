import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import {connectMM} from "./services/metaConnection"
import { formatEther } from "ethers";

function Profile() {
    const [connected, setConnected] = useState(0);

    useEffect(()=>{},[connected]); // watching connection

    const handleConnection = async ()=>{
        const [provider, signer] = await connectMM();
        const accSigner = await provider.getSigner();
            // // testes
            // console.log("numero bloco: ",await provider.getBlockNumber());
            // console.log(rpcSigner.address);
            // const balance = await provider.getBalance(rpcSigner.address)
            // console.log("balance: ",formatEther(balance));
            // console.log("tx count: ", await provider.getTransactionCount(rpcSigner.address));
            // // testes fim
            return accSigner;
    }

    const NotConnectedProfile = () => {
        return (
            <>
                <span>Not Connected</span>
                <br />
                <button onClick={async ()=>{
                    handleConnection()
                    .then( (res) => {
                        console.log("entrou");
                        console.log(res);
                        localStorage.setItem("conn", JSON.stringify(res));
                        setConnected(1);
                    })
                    .catch(err => {console.log("ERROR TRYING CONNECTION: ",err)})
                }}>Login With Metamask</button>
            </>
        );
    }

    const ConnectedProfile = () => {
        return (
            <>
                <span>Address: </span><input type="text" placeholder={JSON.parse(localStorage.getItem('conn')).address} name="" id="" disabled />
                <br />
                <span>balance: </span><span id="TK-amount">?</span><span> MATK</span>
                <button onClick={() => { updateBalance(3) }}>Refresh Balance</button>
                <br />
                <span>My Collection:</span> <button onClick={() => { alert('work') }}>Add</button>
                <br />
                <button onClick={()=>{

                }}>logout</button>
                <div className="hold-test-blocks">
                    {/* <div className="test-block"></div> */}
                </div>
            </>
        );
    } // end of ConnectedProfile


    const ConnComponent = () => {
        if (localStorage.conn == undefined) {
            return <Main page={<NotConnectedProfile />} />;
        } else {
            return <Main page={<ConnectedProfile />} />;   
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