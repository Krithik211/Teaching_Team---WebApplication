// services/courseService.ts

// courseService: encapsulates all GraphQL operations related to courses and lecturer assignments
import { gql } from "@apollo/client";
import { client } from "./apollo-client";
import { Course, LecturerCourseAssignment } from "@/types/type";

/**---------------------------------------------------
 * 1. GraphQL documents: match your DB columns exactly
 *--------------------------------------------------*/

// Query to fetch all courses along with their associated positions
const GET_COURSES = gql`
  query GetCourses {
    getCourses {
      id           // primary key of the course
      courseCode   // unique code identifier for the course
      courseName   // human-readable name of the course
      semester     // semester number (e.g., 1 or 2)
      positions {  // list of position roles available for this course
        id
        name
      }
    }
  }
`;

// Query to fetch all possible course positions (for dropdowns and multi-selects)
const GET_POSITIONS = gql`
  query GetCoursePositions {
    coursePositions {
      id    // primary key of the position
      name  // descriptive name of the position
    }
  }
`;

// Mutation to add a new course with selected positions
const ADD_COURSE = gql`
  mutation AddCourse(
    $courseCode: String!
    $courseName: String!
    $semester: Int!
    $positionIds: [ID!]!
  ) {
    addCourse(
      courseCode: $courseCode
      courseName: $courseName
      semester: $semester
      positionIds: $positionIds
    ) {
      id
      courseCode
      courseName
      semester
      positions {
        id
        name
      }
    }
  }
`;

// Mutation to update an existing course and its positions
const UPDATE_COURSE = gql`
  mutation UpdateCourse(
    $id: ID!
    $courseCode: String!
    $courseName: String!
    $semester: Int!
    $positionIds: [ID!]!
  ) {
    updateCourse(
      id: $id
      courseCode: $courseCode
      courseName: $courseName
      semester: $semester
      positionIds: $positionIds
    ) {
      id
      courseCode
      courseName
      semester
      positions {
        id
        name
      }
    }
  }
`;

// Mutation to delete a course by its ID
const DELETE_COURSE = gql`
  mutation DeleteCourse($id: ID!) {
    deleteCourse(id: $id)
  }
`;

// Query to fetch all lecturer-course assignment records
const GET_LECTURER_COURSES = gql`
  query GetLecturerCourses {
    getLecturerCourses {
      id           // assignment record primary key
      semester     // semester number associated with the assignment
      userId       // ID of the lecturer
      courseId     // ID of the course
    }
  }
`;

// Mutation to assign a lecturer to a given course and semester
const ASSIGN_LECTURER_TO_COURSE = gql`
  mutation AssignLecturerToCourse($lecturerId: ID!, $courseId: ID!, $semester: Int!) {
    assignLecturerToCourse(
      lecturerId: $lecturerId
      courseId: $courseId
      semester: $semester
    ) {
      id
      lecturer {
        firstName
        lastName
      }
      course {
        courseName
      }
      semester
    }
  }
`;

// Query to fetch all assigned lecturers with details
const GET_ASSIGNED_LECTURERS = gql`
  query {
    getAllAssignedLecturers {
      id
      lecturer {
        firstName
        lastName
      }
      course {
        courseName
      }
      semester
    }
  }
`;

// Mutation to remove a lecturer-course assignment record
const DELETE_LECTURER_ASSIGNMENT = gql`
  mutation DeleteLecturerCourseAssignment($id: ID!) {
    deleteLecturerCourseAssignment(id: $id)
  }
`;

/**---------------------------------------------------
 * 2. Service methods for invoking GraphQL operations
 *--------------------------------------------------*/

export const courseService = {
  // ── Positions ─────────────────────────────────────
  // Retrieve all course positions for use in forms
  getPositions: async () => {
    const { data } = await client.query({ query: GET_POSITIONS });
    return data.coursePositions;
  },

  // ── Courses ────────────────────────────────────────
  // Fetch the full list of courses without caching
  getCourses: async (): Promise<Course[]> => {
    console.log('Fetching courses from API');
    const { data } = await client.query({
      query: GET_COURSES,
      fetchPolicy: "no-cache"
    });
    return data.getCourses;
  },

  // Add a new course record with the specified positions
  addCourse: async (
    courseCode: string,
    courseName: string,
    semester: number,
    positionIds: number[]
  ): Promise<Course> => {
    const { data } = await client.mutate({
      mutation: ADD_COURSE,
      variables: { courseCode, courseName, semester, positionIds }
    });
    return data.addCourse;
  },

  // Update an existing course by ID
  updateCourse: async (
    id: number,
    courseCode: string,
    courseName: string,
    semester: number,
    positionIds: number[]
  ): Promise<Course> => {
    const { data } = await client.mutate({
      mutation: UPDATE_COURSE,
      variables: { id, courseCode, courseName, semester, positionIds }
    });
    return data.updateCourse;
  },

  // Remove a course by its ID
  deleteCourse: async (id: number): Promise<boolean> => {
    const { data } = await client.mutate({
      mutation: DELETE_COURSE,
      variables: { id }
    });
    return data.deleteCourse;
  },

  // ── Lecturer Assignments ───────────────────────────
  // Fetch all lecturer-course assignment entries
  getAllAssignedLecturers: async (): Promise<LecturerCourseAssignment[]> => {
    const { data } = await client.query({
      query: GET_ASSIGNED_LECTURERS,
      fetchPolicy: "no-cache"
    });
    return data.getAllAssignedLecturers;
  },

  // Create a new lecturer-course assignment
  assignLecturerToCourse: async (
    lecturerId: number,
    courseId: number,
    semester: number
  ): Promise<LecturerCourseAssignment> => {
    const { data } = await client.mutate({
      mutation: ASSIGN_LECTURER_TO_COURSE,
      variables: {
        lecturerId: lecturerId.toString(),
        courseId: courseId.toString(),
        semester
      }
    });
    return data.assignLecturerToCourse;
  },

  // Delete a lecturer assignment by its record ID
  deleteLecturerCourseAssignment: async (id: number): Promise<boolean> => {
    const { data } = await client.mutate({
      mutation: DELETE_LECTURER_ASSIGNMENT,
      variables: { id }
    });
    return data.deleteLecturerCourseAssignment;
  }
};
