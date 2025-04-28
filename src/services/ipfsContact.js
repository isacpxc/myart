export const getInfoFromCID = async (cid) => {
  // const res = await fetch(`ipfs://${cid}`, { mode: "no-cors" });
  // console.log("cid: ", cid);
  // const res = await fetch(`https://w3s.link/ipfs/${cid}`); // works
  // const res = await fetch(`https://dweb.link/ipfs/${cid}`); // works
  const res = await fetch(`${import.meta.env.VITE_IPFS_GATEWAY}/ipfs/${cid}`);
  // const res = await fetch(`http://127.0.0.1:8080/ipfs/${cid}`, {
  // method: "POST",
  // headers: {
  //   "Access-Control-Allow-Origin": "*",
  // },
  // cors: "no-cors",
  // });
  // const res = await fetch(`https://ipfs.io/ipfs/${cid}`); // works
  // https://${cid}.ipfs.dweb.link/
  const resData = await res.json();
  return resData;
};
