export interface LecturerCourseAssignment {
  id: number;
  semester: number;
  lecturer: any;
  course: any;
}


export interface Course {
  id: number;
  courseCode: string;
  courseName: string;
  semester: number;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isBlocked : boolean;
}

export interface TutorApplication {
  applicationID: number;
  firstName: string;
  lastName: string;
  email: string;
  courseCode: string;
  course: string;
}