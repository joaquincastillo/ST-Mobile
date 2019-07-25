import gql from "graphql-tag";

const MSG_QUERY = gql`
  query Messages($chatId: ID!) {
    messages(chatId: $chatId) {
      edges {
        id
        text
        createdAt
        user {
          username
          roles {
            role
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

export default MSG_QUERY;
