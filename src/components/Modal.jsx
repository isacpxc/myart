import { useState } from "react";
import "./modal.css"; 
import { RiHandCoinLine } from "react-icons/ri";
import { IoMdCloudUpload, IoMdRefresh } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { handePostIPFS, handePostIPFS0 } from "../services/ipfsContact";

export default function Modal(props){
  const [amount, setAmount] = useState('');
  const [cidTxt, setCdiTxt] = useState("");
  const [uploadState, setUploadState] = useState(0);

  const handleUploadNft = async (data)=>{
    const res = await handePostIPFS(data);
    // const res = await handePostIPFS0(data);
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
        const template = {};
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

  const IconUpload = ()=>{
    if (uploadState == 1) {
      const inputLabel = document.getElementById("input-file");
      inputLabel.classList.add("active-upload");
      return <FaCheck/>
    }
    else if (uploadState == 0) return <IoMdCloudUpload/> 
    return <></>
  }

  if (props.id == 1){
    const backdropDiv = document.getElementById("backdrop");
    backdropDiv.classList.add("active-backdrop");
    return (
      <div id="modal">
        <input type="number" value={amount} onChange={(e)=>{setAmount(e.target.value)}} id="tk-amount" placeholder="Enter Amout MATK to buy"/>
        <div id="btn-buy-tk" title="buy" onClick={()=>{
          props.handleMintTK(amount);
        }}><RiHandCoinLine /></div>
        <div id="close-modal" title="close" onClick={()=>{
          backdropDiv.classList.remove("active-backdrop");
          props.setId(0);
        }}>X</div>
      </div>
    )
  } else if (props.id == 2) {
    const backdropDiv = document.getElementById("backdrop");
    backdropDiv.classList.add("active-backdrop");
    return (
      <div id="modal" className="flex-col">
        <div id="close-modal" className="mg-b-5" onClick={()=>{
          backdropDiv.classList.remove("active-backdrop");
          props.setId(0);
          setUploadState(0);
        }}>X</div>
        <label htmlFor="imgNFT" id="input-file" className="mg-b-5">Upload <span id="icon-up"><IconUpload/></span></label>
        <input type="file" accept="image/jpeg" id="imgNFT" hidden onChange={()=>{setUploadState(1)}}/>
        <input type="text" placeholder="nameNFT" id="nameNFT" className="input-pattern mg-b-5"/>
        <input type="number" placeholder="priceNFT" id="priceNFT" className="input-pattern mg-b-5"/>
        <input type="text" placeholder="desc" id="descNFT" className="input-pattern mg-b-5"/>
        <div className="mg-b-5 pointer btn" id="hold-download" onClick={()=>{handleDownloadNft()}}>Download<span id="icon-down" className="mg-l-5"><FaDownload/></span></div>
      </div>
    );
  } else if (props.id == 3) {
    const backdropDiv = document.getElementById("backdrop");
    backdropDiv.classList.add("active-backdrop");

    return (
      <div id="modal">
        <input type="text" placeholder="CID" className="input-pattern" value={cidTxt} onChange={(e)=>{setCdiTxt(e.target.value)}}/>
        <div className="btn mg-l-5" id="cid-sender" onClick={()=>{props.handleAddNFT(cidTxt)}}><IoMdCloudUpload/></div>
        <div id="close-modal" title="close" onClick={()=>{
          backdropDiv.classList.remove("active-backdrop");
          props.setId(0);
          setCdiTxt("");
        }}>X</div>
      </div>
    );
  } else if (props.id == 4) {
    const backdropDiv = document.getElementById("backdrop");
    backdropDiv.classList.add("active-backdrop");

    return (
      <div id="modal">
        <input type="number" className="input-pattern" placeholder="New Price" value={props.newPrice} onChange={(e)=>{props.setNewPrice(e.target.value)}}></input>
        <div className="btn mg-l-5" id="cid-sender" onClick={()=>{
          const nftToGo = props.nftUpdated // proceed...
          nftToGo.price = props.newPrice;
          console.log(typeof nftToGo);
          handleUploadNft(nftToGo);
        }}>Buy</div>
        <div id="close-modal" title="close" onClick={()=>{
          backdropDiv.classList.remove("active-backdrop");
          props.setModalHome(0);
        }}>X</div>
      </div>
    );
  } else if (props.id == 5) { // load modal 
    const backdropDiv = document.getElementById("backdrop");
    backdropDiv.classList.add("active-backdrop");
    return <div id="modal"><span id="loading"><IoMdRefresh/></span></div>
  } else if (props.id == 6) { // success modal
    const backdropDiv = document.getElementById("backdrop");
    backdropDiv.classList.add("active-backdrop");
    return <div id="modal"><span id="success-check"><FaCheck/></span></div>
  } else if (props.id == 7) { // error modal
    const backdropDiv = document.getElementById("backdrop");
    backdropDiv.classList.add("active-backdrop");
    return <div id="modal"><span id="error-check"><IoMdCloseCircleOutline/></span><span style={{color:"red"}}>Something Went Wrong</span><span id="error-check"><IoMdCloseCircleOutline/></span></div>
  } 
}