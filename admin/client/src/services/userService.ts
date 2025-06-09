// services/userService.ts

// userService: encapsulates GraphQL operations for managing user data and account status
import { gql } from "@apollo/client";
import { client } from "./apollo-client";
import { User } from "@/types/type"; // TypeScript interface for User objects as defined in application types

// Query to fetch all users with essential fields including block status
const GET_USERS = gql`
  query {
    users {
      id          // unique user identifier
      firstName   // user's first name
      lastName    // user's last name
      email       // user's email address
      role        // user's assigned role (e.g., 'candidate', 'lecturer', 'admin')
      isBlocked   // boolean flag indicating if the user is blocked
    }
  }
`;

// Mutation to block a user account by user ID
const BLOCK_USER = gql`
  mutation BlockUser($userId: Int!) {
    blockUser(userId: $userId)
  }
`;

// Mutation to unblock a user account by user ID
const UNBLOCK_USER = gql`
  mutation UnblockUser($userId: Int!) {
    unblockUser(userId: $userId)
  }
`;

export const userService = {
  // Fetch all user records from the server
  getAllUsers: async (): Promise<User[]> => {
    // Execute GET_USERS query without caching to always retrieve fresh data
    const { data } = await client.query({ query: GET_USERS, fetchPolicy: "no-cache" });
    // Debug log of fetched users
    console.log("Retrieved users:", data.users);
    // Return the list of User objects from the response
    return data.users;
  },

  // Block the user with the specified ID
  blockUser: async (userId: number): Promise<void> => {
    // Perform the BLOCK_USER mutation with provided userId variable
    await client.mutate({ mutation: BLOCK_USER, variables: { userId } });
  },

  // Unblock the user with the specified ID
  unblockUser: async (userId: number): Promise<void> => {
    // Perform the UNBLOCK_USER mutation with provided userId variable
    await client.mutate({ mutation: UNBLOCK_USER, variables: { userId } });
  },
};
