import gql from "graphql-tag";

const MY_TICKETS_QUERY = gql`
  query UserTickets($userId: ID!) {
    userTickets(userId: $userId) {
      edges {
        id
        chat {
          id
        }
        client {
          name
          address
          phone
        }
        owner {
          username
          phone
        }
        state {
          state
        }
        service
        type
        priority
        supervisor {
          username
        }
        datetime
        createdAt
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export default MY_TICKETS_QUERY;
