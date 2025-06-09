// services/applicationService.ts

// applicationService: handles GraphQL operations for retrieving tutor application rankings and the full list of applications
import { gql } from "@apollo/client";
import { client } from "./apollo-client";
import { TutorApplication } from "@/types/type"; // shape of a tutor application as defined in TypeScript types

// Query to fetch all ranked (accepted) tutor applications
const GET_ALL_RANKED_APPLICATIONS = gql`
  query {
    getAllApplicantsRanking {
      applicationID  // unique identifier for the application
      firstName      // applicant's first name
      lastName       // applicant's last name
      email          // applicant's email address
      courseCode     // code of the course to which they applied
      course         // course name
    }
  }
`;

// Query to fetch every tutor application, regardless of ranking status
const GET_ALL_APPLICATIONS = gql`
  query {
    getAllApplications {
      applicationID
      firstName
      lastName
      email
      courseCode
      course
    }
  }
`;

export const applicationService = {
  // Retrieve only the ranked (chosen) applications
  getAllRankedApplications: async (): Promise<TutorApplication[]> => {
    // Execute the GET_ALL_RANKED_APPLICATIONS query without using cache
    const { data } = await client.query({
      query: GET_ALL_RANKED_APPLICATIONS,
      fetchPolicy: "no-cache"
    });
    // Log the retrieved rankings for debugging
    console.log("ranked applications", data.getAllApplicantsRanking);
    // Return the array of TutorApplication objects
    return data.getAllApplicantsRanking;
  },

  // Retrieve the complete list of applications for comparison or reporting
  getAllApplications: async (): Promise<TutorApplication[]> => {
    // Execute the GET_ALL_APPLICATIONS query without using cache
    const { data } = await client.query({
      query: GET_ALL_APPLICATIONS,
      fetchPolicy: "no-cache"
    });
    // Log all applications for debugging
    console.log("all applications", data.getAllApplications);
    // Return the array of TutorApplication objects
    return data.getAllApplications;
  }
};
