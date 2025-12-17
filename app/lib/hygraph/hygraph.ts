import { GraphQLClient } from 'graphql-request';

const endpoint = process.env.NEXT_PUBLIC_HYGRAPH_API_URL;

if (!endpoint) {
  throw new Error('NEXT_PUBLIC_HYGRAPH_API_URL is not defined');
}

export const hygraphClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_API_TOKEN}`,
  },
});
