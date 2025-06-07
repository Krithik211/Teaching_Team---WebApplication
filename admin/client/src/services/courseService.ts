import { gql } from "@apollo/client";
import { client } from "./apollo-client";
import { Course, LecturerCourseAssignment } from "@/types/type";


const GET_COURSES = gql`
  query GetCourses {
    getCourses {
      id
      courseName
      courseCode
    }
  }
`;
const GET_LECTURERS = gql`
  query {
    users {
      id
      firstName
      lastName
      roleId
    }
  }
`;


const ADD_COURSE = gql`
  mutation AddCourse($courseName: String!, $courseCode: String!) {
    addCourse(courseName: $courseName, courseCode: $courseCode) {
      id
      courseName
      courseCode
    }
  }
`;

const UPDATE_COURSE = gql`
  mutation UpdateCourse($id: ID!, $courseName: String!, $courseCode: String!) {
    updateCourse(id: $id, courseName: $courseName, courseCode: $courseCode) {
      id
      courseName
      courseCode
    }
  }
`;
const ASSIGN_LECTURER = gql`
  mutation AssignLecturerToCourse($lecturerId: ID!, $courseId: ID!, $semester: String!) {
    assignLecturerToCourse(lecturerId: $lecturerId, courseId: $courseId, semester: $semester) {
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

const DELETE_COURSE = gql`
  mutation DeleteCourse($id: ID!) {
    deleteCourse(id: $id)
  }
`;

export const courseService = {
  getCourses: async (): Promise<Course[]> => {
    const { data } = await client.query({
      query: GET_COURSES,
      fetchPolicy: "no-cache"
    });
    return data.getCourses;
  },
  getAllAssignedLecturers: async (): Promise<LecturerCourseAssignment[]> => {
    const { data } = await client.query({
      query: GET_ASSIGNED_LECTURERS,
      fetchPolicy: "no-cache"
    });
    return data.getAllAssignedLecturers;
  },

  addCourse: async (courseName: string, courseCode: string): Promise<Course> => {
    const { data } = await client.mutate({
      mutation: ADD_COURSE,
      variables: { courseName, courseCode },
    });
    return data.addCourse;
  },
  updateCourse: async (id: number, courseName: string, courseCode: string): Promise<Course> => {
    console.log("Sending to GraphQL:", { id, courseName, courseCode });
    const { data } = await client.mutate({
      mutation: UPDATE_COURSE,
      variables: { id, courseName, courseCode },
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
  assignLecturerToCourse: async (lecturerId: number, courseId: number, semester: string): Promise<boolean> => {
    try {
      const { data, errors } = await client.mutate({
        mutation: ASSIGN_LECTURER,
        variables: {
          lecturerId: lecturerId.toString(),
          courseId: courseId.toString(),
          semester
        },
      });
      if (errors && errors.length > 0) {
        console.error("GraphQL Errors:", errors);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Apollo Error:", error);
      return false;
    }
  },

};
