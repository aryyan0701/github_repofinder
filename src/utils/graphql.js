import { gql } from '@apollo/client';

export const SEARCH_REPOSITORIES = gql`
  query SearchRepositories($query: String!, $first: Int!, $after: String) {
    search(query: $query, type: REPOSITORY, first: $first, after: $after) {
      edges {
        node {
          ... on Repository {
            name
            owner {
              login
              avatarUrl
            }
            url
            homepageUrl
            createdAt
            description
            stargazers {
              totalCount
            }
            forks {
              totalCount
            }
          }
        }
        cursor
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;
