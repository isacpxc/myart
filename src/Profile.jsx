import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import {connectMM} from "./services/metaConnection"
import * as handleTx from "./services/handleTx"
import { formatEther } from "ethers";
import { createContractTK } from "./contracts/abi";

function Profile() {
    const [connected, setConnected] = useState(0);
    const [currentContract, setcurrentContract] = useState(null);
    const [balance, setBalance] = useState("?");

    useEffect(()=>{},[connected]); // watching connection
    useEffect(()=>{
        if (localStorage.balance) setBalance(localStorage.balance);
    },[]);

    const handleLogout = () => {
        localStorage.removeItem("conn");
    }

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
                    .then( async (res) => {
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
                <span>balance: </span><span onLoad={(item)=>{
                    if (localStorage.balance) setBalance(localStorage.balance);
                }}></span>{balance}<span> MATK</span>
                <button onClick={async () => { 
                    const addressAcc = String(JSON.parse(localStorage.conn).address);
                    const contractTK = await createContractTK(await connectMM());
                    console.log(contractTK);
                    handleTx.getBalance(contractTK,addressAcc)
                    .then((res)=>{
                        localStorage.setItem("balance",res);
                        setBalance(res);
                    })
                    .catch(err => +console.log("ERROR DURING TX: ", err))
                 }}>Refresh Balance</button>
                <br />
                <span>My Collection:</span> <button onClick={() => { alert('work') }}>Add</button>
                <br />
                <button onClick={async ()=>{
                    () =>{setContracts(null)}
                    handleLogout();
                    setConnected(0);
                }}>logout</button>
                <br />
                {/* <button onClick={()=>{showtest("cuzas")}}>test</button> */}
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