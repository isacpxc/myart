export const getInfoFromCID = async (cid) => {
  // const res = await fetch(`ipfs://${cid}`, { mode: "no-cors" });
  console.log("cid: ", cid);
  const res = await fetch(`https://ipfs.io/ipfs/${cid}/`);
  console.log(await res.json());
};
