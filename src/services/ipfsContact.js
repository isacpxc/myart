export const getInfoFromCID = async (cid) => {
  // const res = await fetch(`ipfs://${cid}`, { mode: "no-cors" });
  console.log("cid: ", cid);
  // const res = await fetch(`https://w3s.link/ipfs/${cid}`); // works
  // const res = await fetch(`https://dweb.link/ipfs/${cid}`); // works
  const res = await fetch(`https://ipfs.io/ipfs/${cid}`); // works
  // https://${cid}.ipfs.dweb.link/
  console.log(await res.json());
};
