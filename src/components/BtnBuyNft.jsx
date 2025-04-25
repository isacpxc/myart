export default function BtnBuyNft(props){
  if (JSON.parse(localStorage.getItem("conn")).address == props.owner){
    return <></>
  } else {
    return <div className="btnBuy" onClick={()=>{
      // console.log("id:",props.id, "owner:",props.owner);
    }}><span>Buy</span></div>
  }
}