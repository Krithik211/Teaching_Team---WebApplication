// Defines the Course type and provides default course listings.
// Used for populating course options in the tutor application process.

export interface CoursePosition {
  position_id: number;
  position_name: string;
}

export interface Course {
  course_id: number;
  course_code: string;
  course_name: string;
  positions: CoursePosition[];
}

export interface CoursesResponse {
  message: string;
  courses: Course[];
}
  