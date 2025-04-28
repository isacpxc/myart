import { connectMM } from "../services/metaConnection";
import { buyNft, getBalance, getNftById } from "../services/handleTx";
import { createContractNFT, createContractTK } from "../contracts/abi";
import { getInfoFromCID } from "../services/ipfsContact";
import { useState } from "react";

export default function BtnBuyNft(props){
  const [newPrice, setNewPrice] = useState("");
  const [newCid, setNewCid] = useState("");

  const handleBuyNft = async (currentOwner, idNft)=>{
    props.setModalHome(5);
    const provider = await connectMM();
    // console.log(provider);
    const contractTK = await createContractTK(provider[0]);
    // console.log(contractTK)
    const balance = parseInt(await getBalance(contractTK, JSON.parse(localStorage.getItem("conn")).address))
    console.log("balance: ", balance);
    const contractNFT = await createContractNFT(provider[0]);
    const nftCid = await getNftById(contractNFT, idNft);
    // console.log("cid: ", nftCid);
    let metadata = await getInfoFromCID(nftCid);
    if (balance < parseInt(metadata.price)){
      alert("You don't have enough MATK to buy this NFT!");
      return 0;
    }
    const contractTKSigner = await createContractTK(provider[1]);
    // console.log(contractTKSigner);
    // const result = await buyNft(contractTK,[currentOwner, parseInt(metadata.price), idNft, ]);
    // const newNft = props.nft; // this way he updates the state without set
    let newNft = {img: props.nft.img, name: props.nft.name, price: "N/A", desc: props.nft.desc};
    props.setNftUpdated(newNft);
    props.setModalHome(4);

  }

  if (JSON.parse(localStorage.getItem("conn")).address == props.owner){
    return <></>
  } else {
    return <div className="btnBuy" onClick={()=>{
      handleBuyNft(props.owner, props.id);
    }}><span>Buy</span></div>
  }
}