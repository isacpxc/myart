import {connectMM} from "../services/metaConnection"
import * as handleTx from "../services/handleTx"
import { createContractNFT, createContractTK } from "../contracts/abi"
import { useState } from "react";
import { useEffect } from "react";

export default function ConnectedProfile ({setConnected}) {
  const [balance, setBalance] = useState("?");
  const [uriTxt, setUriTxt] = useState("");
  const [toMint, setToMint] = useState(0);
  const [nft, setNft] = useState([]);

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
          <span>balance: </span><span onLoad={()=>{
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
          <input type="number"  value={toMint} onChange={(e)=>{setToMint(e.target.value)}} /><button onClick={async ()=>{
            const signer = (await connectMM())[1];
            const contractTK = await createContractTK([signer]);
            console.log(signer);
            console.log(contractTK);
            const tx = await handleTx.mintTK(contractTK,toMint)
            console.log(await tx.wait());
          }}>MintTK</button>
          <br />
          <input type="text" value={uriTxt} onChange={(e)=>{
            e.preventDefault();
            setUriTxt(e.target.value);
            // console.log(uriTxt);
          }}/>
          <button onClick={async () => { 
            const addressAcc = String(JSON.parse(localStorage.conn).address);
            const signer = (await connectMM())[1];
            const contractNFT = await createContractNFT(signer);
            console.log(contractNFT);
            const tx = await handleTx.minNFT(contractNFT, addressAcc, uriTxt)
            console.log(await tx.wait());
            
          }}>Add</button>
          <br />
          <button onClick={async ()=>{
            handleLogout();
            setConnected(0);
          }}>logout</button>
          <br />
          <span>My Collection:</span> <button onClick={async ()=>{
            const addressAcc = String(JSON.parse(localStorage.conn).address);
            const provider = await (await connectMM())[0];
            // console.log(provider);
            const contractNFT = await createContractNFT(provider);
            const filter = await contractNFT.filters.e_minted(addressAcc)
            const events = await contractNFT.queryFilter(filter, -100);
            setNft(events);
            console.log(events);
          }}>see</button>
          <br />
          {/* <button onClick={()=>{showtest("cuzas")}}>test</button> */}
          <div className="hold-test-blocks">
            {nft.map(event => <div className="test-block"></div>)}
          </div>
      </>
  );
} // end of ConnectedProfile