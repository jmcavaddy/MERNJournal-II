import { gql } from '@apollo/client';

//profile mutation

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      profile {
        _id
      }
    }
  }
`;

export const ADD_PROFILE = gql`
  mutation addProfile($username: String!, $password: String!) {
    addProfile(username: $username, password: $password) {
      token
      profile {
        _id
        username
      }
    }
  }
`;

export const ADD_ENTRY = gql`
mutation  AddEntry($entryTitle: String!, $entryContent: String!) {
  addEntry(entryTitle: $entryTitle, entryContent: $entryContent) {
    _id
    createdAt
    entryAuthor
    entryContent
    entryTitle
  }
}
`;

export const EDIT_ENTRY = gql`
mutation EditEntry($entryId: ID!, $editEntryEntryTitle: String!, $editEntryEntryContent: String!) {
  editEntry(entryId: $entryId, entryTitle: $editEntryEntryTitle, entryContent: $editEntryEntryContent) {
    _id
    createdAt
    entryAuthor
    entryContent
    entryTitle
  }
}
`;

export const REMOVE_ENTRY = gql`
mutation RemoveEntry($removeEntryEntryId2: ID!) {
  removeEntry(entryId: $removeEntryEntryId2) {
    _id
  }
}
`;