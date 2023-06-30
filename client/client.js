const axios = require("axios");

const query = `
{
  user(wallet_address: "0x0B3d07B26D2e5E1d0c2696d0E13d26BFD7344579") {
    wallet_address
    reward_pool
    nfts {
      id
      title
      recipient_wallet
    }
  }
}`;

axios
  .post("http://localhost:4000/graphql", { query })
  .then((res) => {
    console.log(JSON.stringify(res.data, null, 2)); // pretty print the result
  })
  .catch((err) => console.error(err));
