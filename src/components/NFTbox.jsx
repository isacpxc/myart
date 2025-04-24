import BtnBuyNft from "./btnBuyNft";

export default function NFTbox (props) {
  
  return(
    <div className="nft-box" style={props.boxStyle}>
      <div className="hold-price-info">
        <span className="nft-hold-price">{props.price}</span>
        <span className="tk-symbol"></span>
      </div>
      <div className="about-nft">
        <div className="nft-name flex-col pad-left-2">
          <span className="nft-item-title">Name:</span>
          <span className="nft-item-desc">{" "+props.name}</span>
        </div>
        <div className="nft-desc flex-col pad-left-2">
          <span className="nft-item-title">Description:</span>
          <span className="nft-item-desc">{" "+props.desc}</span>
        </div>
        <div className="nft-price pad-left-2" style={{paddingBottom: "5px"}}>
          <span className="nft-item-title">Price:</span>
          <span className="nft-item-desc">{" "+props.price+" MATK"}</span>
        </div>
        {localStorage.conn ? <BtnBuyNft id={props.id} owner={props.owner}/> : <div></div>}
      </div>
    </div>
  );
}