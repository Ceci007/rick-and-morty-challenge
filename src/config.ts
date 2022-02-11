import { ApolloClient, InMemoryCache } from "@apollo/client";

/*
  We already configured Apollo for you, 
  but please make sure your queries are type safe!
*/

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://rickandmortyapi.com/graphql"
});