import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
const GITHUB_ACCESS_TOKEN = import.meta.env.VITE_GITHUB_ACCESS_TOKEN;

if (!GITHUB_ACCESS_TOKEN) {
    throw new Error("Missing GitHub Access Token");
  }

const httpLink = new HttpLink({
  uri: 'https://api.github.com/graphql',
  headers: {
    Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`,
  },
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default apolloClient;
