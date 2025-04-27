import { useState } from "react";
import "./modal.css"; 
import { RiHandCoinLine } from "react-icons/ri";

export default function Modal(props){
  const [amount, setAmount] = useState('');
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
      <div id="modal">
      </div>
    );
  }
}