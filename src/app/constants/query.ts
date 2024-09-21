import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      access_token
      refresh_token
    }
  }
`;

export const USER_QUERY  = gql`
  query {
  myProfile {
    id
    name
    avatar
  }
}
`