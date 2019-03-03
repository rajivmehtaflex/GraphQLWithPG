const { db } = require("./grabfrompg");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require("graphql");

const foo = new GraphQLObjectType({
  name: "GetDetails",
  fields: {
    firstname: { type: GraphQLString },
    lastname: { type: GraphQLString },
    age: { type: GraphQLInt }
  }
});

let client = null;

db.getConnection().then(db => {
  client = db;
});

const rootQuery = new GraphQLObjectType({
  name: "GrabInfo",
  fields: {
    employeeInfo: {
      type: foo,
      args: {
        id: { type: GraphQLInt }
      },
      resolve: async (parentsValue, args) => {
        return await db.getPGData(client);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: rootQuery
});
