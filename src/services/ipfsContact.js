import { create } from "kubo-rpc-client";

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

export const handePostIPFS0 = async (data) => {
  const ipfs = create("/ip4/127.0.0.1/tcp/5001");

  // call Core API methods
  const { cid } = await ipfs.add(JSON.stringify(data));

  console.log(cid.toString());
};

export const handePostIPFS = async (data) => {
  const formData = new FormData();
  const jsonContent = JSON.stringify(data);
  const blob = new Blob([jsonContent], { type: "application/json" });
  formData.append("file", blob, "nft.json");

  fetch("http://127.0.0.1:5001/api/v0/add?quiet=true&quieter=false", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Erro na API: ${response.status} ${response.statusText}`
        );
      }
      return response.json();
    })
    .then((data) => console.log("Resposta da API:", data))
    .catch((error) => console.error("Erro:", error));
};
