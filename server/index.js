const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
// allow cross-origin request i.e to allow request from front-end

app.use(cors());
//
mongoose.connect(
  "mongodb+srv://limbaniroshan603:GukL75FZ4HUxR5ZY@gql-ninja.qaovrug.mongodb.net/?retryWrites=true&w=majority&appName=gql-ninja",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true, //for interaction purpose without the page
    customFormatErrorFn(err) {
      console.error("GraphQL Error:", err);
      return {
        message: err.message,
        locations: err.locations,
        stack: err.stack ? err.stack.split("\n") : [],
        path: err.path,
      };
    },
  })
);

app.listen(4000, () => {
  console.log("App is running at port 4000");
});
