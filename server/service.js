const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const pool = require("../database/db.js"); // import pool from db.js

// Define the schema
const schema = buildSchema(`
  type Query {
    user(wallet_address: String!): User
  }

  type User {
    wallet_address: String
    reward_pool: String
    nfts: [Nft]
  }

  type Nft {
    id: Int
    title: String
    recipient_wallet: String
  }
`);

// Define the resolvers
const root = {
  user: async ({ wallet_address }) => {
    const { rows } = await pool.query(
      "SELECT * FROM quad_users WHERE wallet_address = $1",
      [wallet_address]
    ); // changed 'id' to 'wallet_address'
    return rows[0];
  },
};

// Resolver for nfts field on User type
schema.getType("User").getFields().nfts.resolve = async (user) => {
  const { rows } = await pool.query(
    "SELECT * FROM nfts WHERE recipient_wallet = $1",
    [user.wallet_address]
  ); // changed 'userId' to 'recipient_wallet'
  return rows;
};

// Create an Express server and a GraphQL endpoint
const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: false,
  })
);

app.listen(4000, () =>
  console.log("Express GraphQL Server Now Running On localhost:4000/graphql")
);
