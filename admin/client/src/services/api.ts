import { gql } from "@apollo/client";
import { client } from "./apollo-client";

// Our typescript interface for a pet
export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  firstName: string;
  lastName:string;
}
const USERS_QUERY = gql`
  query {
    users {
      id
      email
      password
      firstName
      lastName
    }
  }
`;

export const userService = {
  getAllPets: async (): Promise<User[]> => {
    const { data } = await client.query({ query: USERS_QUERY });
    console.log("Fetched Users:", data);
    return data.users;
  },
};
