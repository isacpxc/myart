import {connectMM} from "../services/metaConnection"
import * as handleTx from "../services/handleTx"
import { createContractNFT, createContractTK } from "../contracts/abi"
import { useState } from "react";
import { useEffect } from "react";

export default function ConnectedProfile ({setConnected}) {
  const [balance, setBalance] = useState("?");
  const [uriTxt, setUriTxt] = useState("");

  useEffect(()=>{
    if (localStorage.balance) setBalance(localStorage.balance);
  },[]);

  const handleLogout = () => {
    localStorage.removeItem("conn");
    localStorage.removeItem("balance");
  }

  return (
      <>
          <span>Address: </span><input type="text" placeholder={JSON.parse(localStorage.getItem('conn')).address} name="" id="" disabled />
          <br />
          <span>balance: </span><span onLoad={(item)=>{
              if (localStorage.balance) setBalance(localStorage.balance);
          }}></span>{balance}<span> MATK </span>
          <button onClick={async () => { 
              const addressAcc = String(JSON.parse(localStorage.conn).address);
              const contractTK = await createContractTK(await connectMM());
              console.log(contractTK);
              handleTx.getBalance(contractTK,addressAcc)
              .then((res)=>{
                  localStorage.setItem("balance",res);
                  console.log("successful query");
                  setBalance(res);
              })
              .catch(err => +console.log("ERROR DURING TX: ", err))
           }}>Refresh Balance</button>
          <br />
          <span>My Collection:</span> 
          <input type="text" value={uriTxt} onChange={(e)=>{
            e.preventDefault();
            setUriTxt(e.target.value);
            // console.log(uriTxt);
          }}/>
          <button onClick={async () => { 
              const addressAcc = String(JSON.parse(localStorage.conn).address);
              const contractNFT = await createContractNFT(await connectMM());
              handleTx.safeMint(contractNFT,addressAcc,"uritest")
              .then((res)=>{
                  console.log("successful query");
              })
              .catch(err => console.log("ERROR DURING TX: ", err))
           }}>Add</button>
          <br />
          <button onClick={async ()=>{
              () =>{setContracts(null)};
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