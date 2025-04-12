export default function HowToUse() {
  return (
    <>
      <h1 id="myart">myart</h1>
      <p>myart is my personal project for a client-based application to interact with smart contracts.</p>
      <p>Essencially, the idea here is a simple marketplace to trade NFTs (AI-generated personal images) with the MATK token.</p>
      <h2 id="main-topics">main topics</h2>
      <ul>
        <li><p>MATK token: internal token for marketing NFTs.</p>
        </li>
        <li><p>NFT: image + metadata.</p>
        </li>
        <li><p>The metadata of the images will be stored in <a href="https://ipfs.tech/">IPFS network</a>.</p>
        </li>
        <li><p>Login with <a href="https://metamask.io/">Metamask</a>.</p>
        </li>
        <li><p>Use of <a href="https://sepolia.dev/">Sepolia</a> testnet for now (maybe polygon latter).</p>
        </li>
        <li><p><a href="https://docs.ethers.org/v5/">Ethers.js</a> providing connection between frontend and the smartcontracts.</p>
        </li>
        <li><p><a href="https://helia.io/">Helia</a> Provides connection with IPFS network.</p>
        </li>
        <li><p>See <a href="https://github.com/isacpxc/myart/issues">issues</a> for more</p>
        </li>
      </ul>

    </>
  );
}