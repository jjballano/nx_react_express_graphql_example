import express from 'express';
import { resolvers, typeDefs } from '@jjballano/data/employee'
import { ApolloServer } from 'apollo-server-express';

const app = express();

//Probably we would have a resolvers file with all of them instead of only the ones for employee
const server = new ApolloServer({ typeDefs, resolvers, introspection: true });
server.start().then(() => {
  server.applyMiddleware({ app });
  const port = process.env.port || 3333;
  app.listen(port, () => {
   // console.log(`Listening at http://localhost:${port}${server.graphqlPath}`);
  });
})

export {server};
export default app;