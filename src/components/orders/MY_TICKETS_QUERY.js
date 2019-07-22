import gql from "graphql-tag";

const MY_TICKETS_QUERY = gql`
  query UserAssignations($userId: ID!) {
    userAssignations(userId: $userId) {
      edges {
        ticket {
          id
          type
          service
          priority
          description
          state {
            state
          }
          createdAt
          chat {
            id
          }
          client {
            id
            email
            name
            address
            phone
          }
          owner {
            username
            phone
          }
          datetime
          supervisor {
            username
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export default MY_TICKETS_QUERY;
