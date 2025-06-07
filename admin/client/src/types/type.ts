export interface LecturerCourseAssignment {
  id: number;
  semester: string;
  lecturer: {
    firstName: string;
    lastName: string;
  };
  course: {
    courseName: string;
  };
}


export interface Course {
  id: number;
  courseName: string;
  courseCode: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  roleId: number;
  isBlocked : boolean;
}