// Defines the Course type and provides default course listings.
// Used for populating course options in the tutor application process.

export type Course = {
    course_code: string;
    course_name: string;
    role: string;
  };
  
  export const DEFAULT_COURSES: Course[] = [
    { course_code: "COSC1234", course_name: "Further Web Programming", role: "tutor" },
    { course_code: "COSC2345", course_name: "Data Science", role: "tutor" },
    { course_code: "COSC3456", course_name: "Cloud Security", role: "tutor" },
    { course_code: "COSC5678", course_name: "Software Development", role: "tutor" },
    { course_code: "COSC0987", course_name: "Artificial Intelligence", role: "tutor" },
    { course_code: "COSC9876", course_name: "Data Analytics", role: "tutor" },
    { course_code: "COSC8765", course_name: "Cloud Computing", role: "tutor" },
    { course_code: "COSC6543", course_name: "Mobile App Development", role: "tutor" }
  ];
  