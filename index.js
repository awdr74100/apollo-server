const { ApolloServer, gql } = require("apollo-server");
const { products, categories } = require("./data");

const typeDefs = gql`
  type Query {
    hello: String
    products: [Product!]!
    product(id: ID!): Product
    categories: [Category!]!
    category(id: ID!): Category
  }

  type Product {
    id: ID!
    name: String!
    description: String!
    quantity: Int!
    price: Float!
    image: String!
    onSale: Boolean!
  }

  type Category {
    id: ID!
    name: String!
    products: [Product!]!
  }
`;

const resolvers = {
  Query: {
    hello: (parent, args, context) => "World",
    products: (parent, args, context) => products,
    product: (parent, args, context) => {
      const { id } = args;
      return products.find((product) => product.id === id);
    },
    categories: (parent, args, context) => categories,
    category: (parent, args, context) => {
      const { id } = args;
      return categories.find((category) => category.id === id);
    },
  },
  Category: {
    products: (parent, args, context) => {
      const { id } = parent;
      return products.filter((product) => product.categoryId === id);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server is ready at ${url}`);
});
