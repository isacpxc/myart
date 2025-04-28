import { useState } from "react";
import "./modal.css"; 
import { RiHandCoinLine } from "react-icons/ri";
import { IoMdCloudUpload } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";

export default function Modal(props){
  const [amount, setAmount] = useState('');
  const [cidTxt, setCdiTxt] = useState("");
  const [uploadState, setUploadState] = useState(0);

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
  }
}