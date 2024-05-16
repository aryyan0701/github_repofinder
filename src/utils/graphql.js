import { gql } from '@apollo/client';

export const SEARCH_REPOSITORIES = gql`
  query SearchRepositories($query: String!, $first: Int!) {
    search(query: $query, type: REPOSITORY, first: $first) {
      edges {
        node {
          ... on Repository {
            name
            owner {
              login
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
      }
    }
  }
`;