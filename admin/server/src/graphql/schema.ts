import { gql } from "graphql-tag";

export const typeDefs = gql`
  type User {
    id: ID!
    role: String!
    email: String!
    firstName: String!
    lastName: String!
    isBlocked:Boolean!
  }

  type Course {
    id: ID!
    courseName: String!
    courseCode: String!
    semester:Int!
    positions: [CoursePosition!]!
  }

  type CoursePosition {
    id: ID!
    name: String!
}

  type LecturerCourse {
    id: ID!
    lecturer: User!
    course: Course!
    semester: Int!
  }

  type Mutation {
    addCourse(courseName: String!, courseCode: String!, semester: Int!, positionIds: [ID!]!): Course
    updateCourse(id: ID!, courseName: String!, courseCode: String!, semester:Int!, positionIds: [ID!]!): Course
    deleteCourse(id: ID!): Boolean

    assignLecturerToCourse(lecturerId: ID!, courseId: ID!, semester: Int!): LecturerCourse

    blockUser(userId: Int!): String
    unblockUser(userId: Int!): String
  }

  type Query {
  coursePositions: [CoursePosition!]!
    users: [User]
    user(id: ID!): User
    getCourses: [Course]
  getAllAssignedLecturers: [LecturerCourse]
  }
`;
