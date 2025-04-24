export default function BtnBuyNft(props){
  return <div className="btnBuy" onClick={()=>{
    console.log("id:",props.id, "owner:",props.owner);
  }}><span>Buy</span></div>
}