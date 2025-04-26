import {connectMM} from "../services/metaConnection"
import "./notConnectedProfile.css"

export default function NotConnectedProfile({setConnected}) {
  const handleConnection = async ()=>{
    const [provider, signer] = await connectMM();
    const accSigner = await provider.getSigner();
    return accSigner;
  }

  return (
      <>
        <main id="hold-login">
          <div id="metamask-svg"></div>
          <span id="login-btn" onClick={async ()=>{
              handleConnection()
              .then( async (res) => {
                  console.log("entrou");
                  console.log(res);
                  localStorage.setItem("conn", JSON.stringify(res));
                  setConnected(1);
              })
              .catch(err => {console.log("ERROR TRYING CONNECTION: ",err)})
          }}>Login With MetaMask</span>
        </main>
      </>
  );
}