// Course context to provide access to the list of current semester courses.
// Initializes course data from localStorage or defaults if none exist.

import React, { createContext, useContext, useEffect, useState } from "react";
import { Course, DEFAULT_COURSES } from "../types/Course";

interface CourseContextType {
  currentSemesterCourses: Course[] | null;
}

// Create the course context
const CourseContext = createContext<CourseContextType | undefined>(undefined);

export function CourseProvider({ children }: { children: React.ReactNode }) {
  const [currentSemesterCourses, setCurrentSemesterCourses] = useState<Course[] | null>(null);

  useEffect(() => {
    // Load courses from localStorage or use default courses
    const storedCourses = localStorage.getItem("courses");
    if (!storedCourses) {
      localStorage.setItem("courses", JSON.stringify(DEFAULT_COURSES));
      setCurrentSemesterCourses(DEFAULT_COURSES);
    } else {
      setCurrentSemesterCourses(JSON.parse(storedCourses));
    }
  }, []);

  return (
    <CourseContext.Provider value={{ currentSemesterCourses }}>
      {children}
    </CourseContext.Provider>
  );
}

// Hook to access course context
export function useCourse() {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error("useCourse must be used within an CourseProvider");
  }
  return context;
}
