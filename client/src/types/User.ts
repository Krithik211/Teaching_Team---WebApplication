// Defines the User type and a list of default users with roles.
// Used for authentication and role-based access control in the app.

import { Avatar } from "./Avatar";

export type User = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
    avatar: Avatar;
  };
  