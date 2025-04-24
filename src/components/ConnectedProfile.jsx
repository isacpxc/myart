import { useState } from "react";
import { useEffect } from "react";
import {connectMM} from "../services/metaConnection"
import * as handleTx from "../services/handleTx"
import { createContractNFT, createContractTK } from "../contracts/abi"
import { getInfoFromCID } from "./../services/ipfsContact";
import NFTbox from "./NFTbox";
import "./modal.css"


export default function ConnectedProfile ({setConnected}) {
  const [balance, setBalance] = useState("?");
  const [uriTxt, setUriTxt] = useState("");
  const [toMint, setToMint] = useState(0);
  const [nft, setNft] = useState([]);
  const [nftjson, setNftJson] = useState({"img":"", "name":"","price":0,"desc":""});

  useEffect(()=>{
    if (localStorage.balance) setBalance(localStorage.balance);
  },[]);

  useEffect(()=>{},[nft])

  const handleLogout = () => {
    localStorage.removeItem("conn");
    localStorage.removeItem("balance");
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
    console.log(contractTK);
    handleTx.getBalance(contractTK,addressAcc)
    .then((res)=>{
        localStorage.setItem("balance",res);
        console.log("successful query");
        setBalance(res);
    })
    .catch(err => +console.log("ERROR DURING TX: ", err))
  }

  const handleMintTK = async ()=>{
    const signer = (await connectMM())[1];
    const contractTK = await createContractTK([signer]);
    console.log(signer);
    console.log(contractTK);
    const tx = await handleTx.mintTK(contractTK,toMint)
    console.log(await tx.wait());
  }

  const showModal = ()=>{
    const modal = document.getElementById('modal');
    modal.showModal();
  }
  
  const closeModal = ()=>{
    const modal = document.getElementById('modal');
    setUriTxt("");
    modal.close();
  }

  const handleDownloadNft = async ()=>{
    const imgNFT = document.getElementById("imgNFT");
    const nameNFT = document.getElementById("nameNFT");
    const priceNFT = document.getElementById("priceNFT");
    const descNFT = document.getElementById("descNFT");
    if (imgNFT.value){
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
    } else alert("Você esqueceu a imagem");
    
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
      console.log(contractNFT);
      const tx = await handleTx.mintNFT(contractNFT, addressAcc, uriTxt)
      console.log(await tx.wait());
    } else alert("campo CID vazio");
  }
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////// 
  ////////////////////////////////////////////////////////////////////////////////
  return (
      <>
          <span>Address: </span><input type="text" placeholder={JSON.parse(localStorage.getItem('conn')).address} name="" id="" disabled />
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
          <br />
          {/* <input type="text" value={uriTxt} onChange={(e)=>{
            e.preventDefault();
            setUriTxt(e.target.value);
            // console.log(uriTxt);
          }}/> */}
          <button onClick={async () => { 
            showModal();
          }}>Add</button>
          <br />
          <button onClick={async ()=>{
            handleLogout();
            setConnected(0);
          }}>logout</button>
          <br />
          <span>My Collection:</span> <button onClick={handleGetNft}>see</button>
          <br />
          <button onClick={()=>{console.log(nft)}}>test nft state</button><br />
          {/* <button onClick={()=>{tryGetFromIPFS()}}>test get info IPFS</button><br /> */}
          <div className="hold-nft-boxes">
            {nft.map(event => <NFTbox owner={JSON.parse(localStorage.getItem("conn")).address} id={event.id} name={event.name} desc={event.desc} key={event.name} boxStyle={{background: "url("+event.img+")", backgroundSize: "cover"}} price={event.price}/>)}
            {/* <NFTbox key={`event.name`} /> */}
          </div>
          <dialog id="modal">
              <button onClick={closeModal}>close</button><br />
              <input type="file" accept="image/jpeg" id="imgNFT"/><br />
              <input type="text" placeholder="nameNFT" id="nameNFT"/><br />
              <input type="number" placeholder="priceNFT" id="priceNFT"/><br />
              <input type="text" placeholder="desc" id="descNFT"/><br />
              <button onClick={()=>{handleDownloadNft()}}>download</button><br />
              {/* <button onClick={()=>{console.log(nftjson)}}>test nftemplate</button><br /> */}
              <input type="text" placeholder="cid" value={uriTxt} onChange={e=>{setUriTxt(e.target.value)}}/><br />
              <button onClick={handleAddNFT}>Add nft</button>
          </dialog>
      </>
  );
} // end of ConnectedProfile