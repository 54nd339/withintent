import { GraphQLClient } from 'graphql-request';

const endpoint = process.env.HYGRAPH_API_URL;
const apiToken = process.env.HYGRAPH_API_TOKEN;

if (!endpoint) {
  throw new Error('HYGRAPH_API_URL is not defined');
}

if (!apiToken) {
  throw new Error('HYGRAPH_API_TOKEN is not defined');
}

export const hygraphClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${apiToken}`,
  },
});
