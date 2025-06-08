// src/services/courseService.ts
import { gql } from "@apollo/client";
import { client } from "./apollo-client";
import { Course, LecturerCourseAssignment } from "@/types/type";

/**---------------------------------------------------
 * 1. GraphQL documents: match your DB columns exactly
 *--------------------------------------------------*/

// — COURSES —

const GET_COURSES = gql`
  query GetCourses {
    getCourses {
      id           
      courseCode    
      courseName    
      semester    
    }
  }
`;

const ADD_COURSE = gql`
  mutation AddCourse(
    $courseCode: String!
    $courseName: String!
    $semester: Int!
  ) {
    addCourse(
      courseCode: $courseCode
      courseName: $courseName
      semester: $semester
    ) {
      id
      courseCode
      courseName
      semester
    }
  }
`;

const UPDATE_COURSE = gql`
  mutation UpdateCourse(
    $id: ID!
    $courseCode: String!
    $courseName: String!
    $semester: Int!
  ) {
    updateCourse(
      id: $id
      courseCode: $courseCode
      courseName: $courseName
      semester: $semester
    ) {
      id
      courseCode
      courseName
      semester
    }
  }
`;

const DELETE_COURSE = gql`
  mutation DeleteCourse($id: ID!) {
    deleteCourse(id: $id)
  }
`;

// — LECTURER_COURSES —

const GET_LECTURER_COURSES = gql`
  query GetLecturerCourses {
    getLecturerCourses {
      id           # PK
      semester   # maps to semesterId
      userId       # maps to userId
      courseId     # maps to courseId
    }
  }
`;

const ASSIGN_LECTURER_TO_COURSE = gql`
  mutation AssignLecturerToCourse(
    $userId: ID!
    $courseId: ID!
    $semester: Int!
  ) {
    assignLecturerToCourse(
      userId: $userId
      courseId: $courseId
      semester: $semesterId
    ) {
      id
      semester
      userId
      courseId
    }
  }
`;

const DELETE_LECTURER_ASSIGNMENT = gql`
  mutation DeleteLecturerCourseAssignment($id: ID!) {
    deleteLecturerCourseAssignment(id: $id)
  }
`;

/**---------------------------------------------------
 * 2. Service methods
 *--------------------------------------------------*/

export const courseService = {
  // ── COURSES ───────────────────────────────────────

  getCourses: async (): Promise<Course[]> => {
    console.log('get courses')
    const { data } = await client.query({
      query: GET_COURSES,
      fetchPolicy: "no-cache",
    });
    return data.getCourses;
  },

  addCourse: async (
    courseCode: string,
    courseName: string,
    semester: number
  ): Promise<Course> => {
    const { data } = await client.mutate({
      mutation: ADD_COURSE,
      variables: { courseCode, courseName, semester },
    });
    return data.addCourse;
  },

  updateCourse: async (
    id: number,
    courseCode: string,
    courseName: string,
    semester: number
  ): Promise<Course> => {
    const { data } = await client.mutate({
      mutation: UPDATE_COURSE,
      variables: { id, courseCode, courseName, semester },
    });
    return data.updateCourse;
  },

  deleteCourse: async (id: number): Promise<boolean> => {
    const { data } = await client.mutate({
      mutation: DELETE_COURSE,
      variables: { id },
    });
    return data.deleteCourse;
  },

  // ── LECTURER_COURSES ─────────────────────────────

  getLecturerCourses: async (): Promise<LecturerCourseAssignment[]> => {
    const { data } = await client.query({
      query: GET_LECTURER_COURSES,
      fetchPolicy: "no-cache",
    });
    return data.getLecturerCourses;
  },

  assignLecturerToCourse: async (
    userId: number,
    courseId: number,
    semester: number
  ): Promise<LecturerCourseAssignment> => {
    const { data } = await client.mutate({
      mutation: ASSIGN_LECTURER_TO_COURSE,
      variables: {
        userId: userId.toString(),
        courseId: courseId.toString(),
        semester,
      },
    });
    return data.assignLecturerToCourse;
  },

  deleteLecturerCourseAssignment: async (id: number): Promise<boolean> => {
    const { data } = await client.mutate({
      mutation: DELETE_LECTURER_ASSIGNMENT,
      variables: { id },
    });
    return data.deleteLecturerCourseAssignment;
  },
};
