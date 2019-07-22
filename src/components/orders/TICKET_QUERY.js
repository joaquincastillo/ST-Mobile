import gql from "graphql-tag";

const TICKET_QUERY = gql`
  query Ticket($id: ID!) {
    ticket(id: $id) {
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
`;

export default TICKET_QUERY;
