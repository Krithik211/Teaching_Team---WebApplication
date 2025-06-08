export interface LecturerCourseAssignment {
  id: number;
  semesterId: number;
  userId: number;
  courseId: number;
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
  roleId: number;
  isBlocked : boolean;
}