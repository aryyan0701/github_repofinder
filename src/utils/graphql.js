// src/utils/graphql.js
import { gql } from "@apollo/client";

export const SEARCH_USER_DETAILS = gql`
  query SearchUserDetails($username: String!) {
    user(login: $username) {
      login
      contributionsCollection {
        contributionCalendar {
          totalContributions
        }
        commitContributionsByRepository {
          repository {
            primaryLanguage {
              name
            }
          }
        }
      }
      topRepositories(first: 10, orderBy: { field: CREATED_AT, direction: DESC }) {
        nodes {
          primaryLanguage {
            name
          }
        }
      }
    }
  }
`;

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
            description
            stargazers {
              totalCount
            }
            forks {
              totalCount
            }
            primaryLanguage {
              name
            }
            repositoryTopics(first: 10) {
              nodes {
                topic {
                  name
                }
              }
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
