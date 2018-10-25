var express = require("express");
var graphqlHTTP = require("express-graphql");
var { buildSchema } = require("graphql");

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    soma(a: Int!, b: Int!): [Int]
    subtrai(a: Int!, b: Int!): [Int]
    divisao(a: Int!, b: Int!): [Int]
    multiplicao(a: Int!, b: Int!): [Int]
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  soma: function({ a, b }) {
    var output = [];
    output.push(a + b);
    return output;
  },
  subtrai: function({ a, b }) {
    var output = [];
    output.push(a - b);
    return output;
  },
  divisao: function({ a, b }) {
    var output = [];
    output.push(a / b);
    return output;
  },
  multiplicao: function({ a, b }) {
    var output = [];
    output.push(a * b);
    return output;
  }
};

var app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);
app.listen(4000);
console.log("Running a GraphQL API server at localhost:4000/graphql");
