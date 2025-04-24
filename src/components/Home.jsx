import { useState } from "react";
import "./home.css"
import { IoMdSearch } from "react-icons/io";
import { connectMM } from "../services/metaConnection";
import { createContractNFT } from "../contracts/abi";
import * as handleTx from "../services/handleTx"
import { getInfoFromCID } from "./../services/ipfsContact";
import NFTbox from "./NFTbox";

export default function HomePage() {
  const [addressToSearch, setAddressToSearch] = useState('');
  const [nfts, setNfts] = useState([]);

  const handleGetNft = async ()=>{
    if (addressToSearch) {
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
  
      setNfts(hold);
    } else alert("Enter Address First")
  }

  return (
    <div id="hold-home">
      <span id="home-title">Search Collection by Address</span>
      <div id="search-home">
        <input type="text" value={addressToSearch} onChange={(e)=>{setAddressToSearch(e.target.value)}}/><div><IoMdSearch size={30} onClick={handleGetNft}/></div>
      </div>
      <div className="hold-nft-boxes">
        {nfts.map(event => <NFTbox owner={addressToSearch} id={event.id} name={event.name} desc={event.desc} key={event.name} boxStyle={{background: "url("+event.img+")", backgroundSize: "cover"}} price={event.price}/>)}
      </div>
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