import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query search($query: String!, $limit: Int, $cursor: String) {
    search(first: $limit, type: REPOSITORY, query: $query, after: $cursor) {
      nodes {
        ... on Repository {
          url
          name
          forkCount
          stargazerCount
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
      repositoryCount
    }
  }
`;
