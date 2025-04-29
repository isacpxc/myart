import { useState } from "react";
import "./home.css"
import { IoMdSearch } from "react-icons/io";
import { connectMM } from "../services/metaConnection";
import { createContractNFT } from "../contracts/abi";
import * as handleTx from "../services/handleTx"
import { getInfoFromCID } from "./../services/ipfsContact";
import NFTbox from "./NFTbox";
import Modal from "./Modal";
import excludeBackdrop from "../util/excludeBackdrop";
// import "./modal.css"

export default function HomePage() {
  const [addressToSearch, setAddressToSearch] = useState('');
  const [nfts, setNfts] = useState([]);
  const [modalHome, setModalHome] = useState(0);
  const [newPrice, setNewPrice] = useState("");
  const [nftUpdated, setNftUpdated] = useState({});


  const handleGetNft = async ()=>{
    if (addressToSearch) {
      const gettingNfts = async ()=>{
        const addressAcc = addressToSearch;
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

         return hold;
      }
      setModalHome(5);
      gettingNfts()
      .then((res)=>{
        setModalHome(0);
        excludeBackdrop();
        setNfts(res);
      })
      .catch(err => {
        console.log("ERROR:", err);
        setModalHome(7);
        setTimeout(()=>{
          setModalHome(0);
          excludeBackdrop()
        }, 1000)
      })
    } else alert("Enter Address First")
  }

  return (
    <div id="hold-home">
      <span id="home-title">Search Collection by Address</span>
      <div id="search-home">
        <input type="text" value={addressToSearch} placeholder="Address to Search" onKeyDown={(e)=>{
          if (e.key == "Enter"){
            e.preventDefault()
            document.getElementById('btn-search-home').click();
          }
        }} onChange={(e)=>{setAddressToSearch(e.target.value)}}/>
        <div id="btn-search-home" onClick={handleGetNft}><IoMdSearch size={30}/></div>
      </div>
      <div className="hold-nft-boxes">
        {nfts.map(event => <NFTbox nft={event} setNftUpdated={setNftUpdated} newPrice={newPrice} owner={addressToSearch} id={event.id} name={event.name} desc={event.desc} key={event.name} boxStyle={{background: "url("+event.img+")", backgroundSize: "cover"}} price={event.price} setModalHome={setModalHome}/>)}
      </div>
      <Modal nftUpdated={nftUpdated} id={modalHome} setModalHome={setModalHome} setNewPrice={setNewPrice} newPrice={newPrice}/>
      {/* <button onClick={()=>{console.log(nfts)}}>teste state nft</button> */}
      {/* <div className="hold-nft-boxes">
        <div className="nft-box"></div>
        <div className="nft-box"></div>
        <div className="nft-box"></div>
        <div className="nft-box"></div>
        <div className="nft-box"></div>
        <div className="nft-box"></div>
        <div className="nft-box"></div>
        <div className="nft-box"></div>
      </div> */}
    </div>
  );
}