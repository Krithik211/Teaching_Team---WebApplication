// Defines the User type and a list of default users with roles.
// Used for authentication and role-based access control in the app.

export type User = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
  };
  
  export const DEFAULT_USERS: User[] = [
    { email: "nihilrama@gmail.com", password: "123456", firstName: "Nihil", lastName: "Ramalingam", role: "tutor" },
    { email: "krithik@gmail.com", password: "12345678", firstName: "Krithik", lastName: "Dakshnamurthy", role: "lecturer" },
    { email: "logan@gmail.com", password: "12345", firstName: "Logan", lastName: "Paul", role: "tutor" },
    { email: "karnan@gmail.com", password: "1234567", firstName: "Karnan", lastName: "Kumar", role: "tutor" },
    { email: "kusumbu@gmail.com", password: "abcd", firstName: "Kusumbu", lastName: "Lingam", role: "lecturer" },
    { email: "john@gmail.com", password: "abcdef", firstName: "John", lastName: "Wick", role: "lecturer" }
  ];
  