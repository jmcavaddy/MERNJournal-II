import { gql } from '@apollo/client';

export const QUERY_ME = gql`
query Me {
  me {
    _id
    entries {
      _id
      createdAt
      entryAuthor
      entryContent
      entryTitle
    }
    username
  }
}
`;
