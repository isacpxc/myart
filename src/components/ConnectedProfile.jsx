import { useState } from "react";
import { useEffect } from "react";
import {connectMM} from "../services/metaConnection";
import * as handleTx from "../services/handleTx";
import { createContractNFT, createContractTK } from "../contracts/abi";
import { getInfoFromCID } from "./../services/ipfsContact";
import { IoLogOutOutline } from "react-icons/io5";
import { IoMdRefresh, IoMdAdd } from "react-icons/io";
import { TbBrandCashapp } from "react-icons/tb";
import NFTbox from "./NFTbox";
import Modal from "./Modal";
import "./connected.css";
import "./modal.css";


export default function ConnectedProfile ({setConnected}) {
  const [balance, setBalance] = useState("?");
  const [uriTxt, setUriTxt] = useState("");
  // const [toMint, setToMint] = useState(0);
  const [nft, setNft] = useState([]);
  const [nftjson, setNftJson] = useState({"img":"", "name":"","price":0,"desc":""});
  const [modalId,setModalId] = useState(0);

  useEffect(()=>{
    if (localStorage.balance) setBalance(localStorage.balance);
    handleGetNft();
  },[]);

  useEffect(()=>{},[nft])

  const handleLogout = () => {
    localStorage.removeItem("conn");
    localStorage.removeItem("balance");
    setNft([]);
    setNftJson({"img":"", "name":"","price":0,"desc":""});
    setConnected(0);
  }

  const handleGetNft = async () => {
    const addressAcc = String(JSON.parse(localStorage.conn).address);
    const provider = await (await connectMM())[0];
    const contractNFT = await createContractNFT(provider);
    const result = await handleTx.myNfts(contractNFT, addressAcc);
    let hold = [];
    for (let i=0;i<result.length;i++){   
      let cid = await handleTx.getNftById(contractNFT, result[i]);
      let metadata = await getInfoFromCID(cid);
      metadata.id = parseInt(result[i]);
      hold.push(metadata)
    }

    setNft(hold);
  }

  const handleRefreshBalance = async ()=> {
    const addressAcc = String(JSON.parse(localStorage.conn).address);
    const contractTK = await createContractTK(await connectMM());
    // console.log(contractTK);
    handleTx.getBalance(contractTK,addressAcc)
    .then((res)=>{
        localStorage.setItem("balance",res);
        // console.log("successful query");
        setBalance(res);
    })
    .catch(err => +console.log("ERROR DURING TX: ", err))
  }

  const handleMintTK = async (amount)=>{
    const signer = (await connectMM())[1];
    const contractTK = await createContractTK([signer]);
    // console.log(signer);
    // console.log(contractTK);
    const tx = await handleTx.mintTK(contractTK,amount)
    // console.log(await tx.wait());
  }

  const handleDownloadNft = async ()=>{
    const imgNFT = document.getElementById("imgNFT");
    const nameNFT = document.getElementById("nameNFT");
    const priceNFT = document.getElementById("priceNFT");
    const descNFT = document.getElementById("descNFT");
    if (imgNFT.value && nameNFT && priceNFT && descNFT){
      const reader = new FileReader();
      reader.readAsDataURL(imgNFT.files[0])
      reader.onload = ()=>{
        const template = nftjson;
        template.img = reader.result;
        template.name = nameNFT.value;
        template.price = priceNFT.value;
        template.desc = descNFT.value;
        const a = document.createElement("a");
        const file = new Blob([JSON.stringify(template)],{type: "text/plain"});
        a.href = URL.createObjectURL(file);
        a.download = "nft.json";
        a.click();
      }
    } else alert("Você esqueceu algum campo");
    
  }

  const tryGetFromIPFS = async ()=>{
    const hold = "QmR5VZp9yohes1SuMT12Vdk5GU5kNDcha7ztTUxd8fpdda"
    await getInfoFromCID("Qme7yJkCBFoSxku4fwD81GknSmcoCDhgzH5BZ5atZFD771");
  }

  const handleAddNFT = async ()=>{
    if (uriTxt){
      const addressAcc = String(JSON.parse(localStorage.conn).address);
      const signer = (await connectMM())[1];
      const contractNFT = await createContractNFT(signer);
      // console.log(contractNFT);
      const tx = await handleTx.mintNFT(contractNFT, addressAcc, uriTxt)
      // console.log(await tx.wait());
    } else alert("campo CID vazio");
  }
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////// 
  ////////////////////////////////////////////////////////////////////////////////
  return (
      <>
        <div id="header-connected">
          <div id="conn-h-1">
            <div id="addr-logout">
              <input type="text" title="Wallet Address" placeholder={JSON.parse(localStorage.getItem('conn')).address} disabled/>
              <div title="Logout" onClick={handleLogout}><IoLogOutOutline/></div>
            </div>
            <div id="matk-func">
              <div id="conn-buy-ref">
                <div id="btn-buy" title="buy token" onClick={()=>{
                  setModalId(1);
                }}><TbBrandCashapp/></div>
                <div id="btn-ref" title="refresh balance" onClick={handleRefreshBalance}><IoMdRefresh/></div>
              </div>
              <div id="conn-balance">
                <span>{balance}</span><div></div>
              </div>

            </div>
          </div>
          <div id="conn-h-2">
            <span title="My Collection">My Collection</span>
            <div title="add nft" onClick={()=>{setModalId(2);}}><IoMdAdd/></div>
          </div>
        </div>
        <Modal id={modalId} setId={setModalId} handleMintTK={handleMintTK} nftjson={nftjson}/>
          {/* <span>Address: </span><input type="text" placeholder={JSON.parse(localStorage.getItem('conn')).address} name="" id="" disabled />
          <br />
          <span>balance: </span><span onLoad={()=>{
              if (localStorage.balance) setBalance(localStorage.balance);
          }}></span>{balance}<span> MATK </span>
          <button onClick={async () => { 
            handleRefreshBalance();
           }}>Refresh Balance</button>
          <br />
          <input type="number"  value={toMint} onChange={(e)=>{setToMint(e.target.value)}} /><button onClick={async ()=>{
            handleMintTK();
          }}>MintTK</button>
          <br /> */}
          {/* <input type="text" value={uriTxt} onChange={(e)=>{
            e.preventDefault();
            setUriTxt(e.target.value);
            // console.log(uriTxt);
          }}/> */}
          {/* <button onClick={async () => { 
            showModal();
          }}>Add</button>
          <br />
          <button onClick={async ()=>{
            handleLogout();
            setConnected(0);
          }}>logout</button>
          <br />
          <span>My Collection:</span> <button onClick={handleGetNft}>see</button>
          <br /> */}
          {/* <button onClick={()=>{console.log(nft)}}>test nft state</button><br /> */}
          {/* <button onClick={()=>{tryGetFromIPFS()}}>test get info IPFS</button><br /> */}
          <div className="hold-nft-boxes">
            {nft.map(event => <NFTbox owner={JSON.parse(localStorage.getItem("conn")).address} id={event.id} name={event.name} desc={event.desc} key={event.name} boxStyle={{background: "url("+event.img+")", backgroundSize: "cover"}} price={event.price}/>)}
            {/* <NFTbox key={`event.name`} /> */}
          </div>
          {/* <dialog id="modal">
              <button onClick={closeModal}>close</button><br />
              <input type="file" accept="image/jpeg" id="imgNFT"/><br />
              <input type="text" placeholder="nameNFT" id="nameNFT"/><br />
              <input type="number" placeholder="priceNFT" id="priceNFT"/><br />
              <input type="text" placeholder="desc" id="descNFT"/><br />
              <button onClick={()=>{handleDownloadNft()}}>download</button><br />
              <button onClick={()=>{console.log(nftjson)}}>test nftemplate</button><br />
              <input type="text" placeholder="cid" value={uriTxt} onChange={e=>{setUriTxt(e.target.value)}}/><br />
              <button onClick={handleAddNFT}>Add nft</button>
          </dialog> */}
      </>
  );
} // end of ConnectedProfile