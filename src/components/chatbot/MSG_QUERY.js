import gql from "graphql-tag";

const MSG_QUERY = gql`
  query Messages($chatId: ID!) {
    messages(chatId: $chatId) {
      edges {
        text
        createdAt
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export default MSG_QUERY;
