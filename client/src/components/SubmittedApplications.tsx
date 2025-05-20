// Displays the list of tutor applications submitted by the logged-in user.
// Allows tutors to update their existing applications.

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";

const SubmittedApplications = () => {
  const [currentTutorApplications, setCurrentTutorApplications] = useState<Record<string, any>>({});
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const allApplications = localStorage.getItem("tutorApplications");
    const parsed = allApplications ? JSON.parse(allApplications) : {};

    // Filter applications belonging to the current user
    const userApplications = Object.fromEntries(
      Object.entries(parsed).filter(([key]) =>
        key.endsWith(`_${currentUser?.email}`)
      )
    );

    setCurrentTutorApplications(userApplications);
  }, [currentUser]);

  // Prepares update state and redirects to the tutor application form
  const handleUpdate = (course_name: string, course_code: string, role: string) => {
    console.log(course_name);
    const applyingState = {
      courseCode: course_code,
      courseName: course_name,
      role: role,
      isApplying: false,
      isUpdating: true,
    };
    localStorage.setItem("tutorApplicationState", JSON.stringify(applyingState));
    router.push("/tutorApplicationForm");
  };

  // Display message if user has not submitted any applications
  if (!currentTutorApplications || Object.keys(currentTutorApplications).length === 0) {
    return (
      <div className="mt-20 mb-20 text-center text-red-700 text-2xl bg-white rounded-lg p-6 shadow border border-gray-200">
      No applications submitted
      </div>
    );
  }

  return (
    <>
      {/* Render submitted applications */}
      <div className="max-h-[500px] overflow-y-auto mx-30 mb-10 px-4 border border-gray-200 rounded-none shadow-inner">
        {Object.entries(currentTutorApplications).map(([key, application]: [string, any], index) => {
          const [course_code] = key.split("_");

          return (
            <div
              key={index}
              className="flex flex-1 mb-4 mx-10 mt-10 p-6 text-1xl bg-blue-100 text-gray-900 rounded-none justify-between"
            >
              {/* Application details */}
              <div className="flex flex-row">
                <h1>COURSE CODE: {course_code}</h1>
                <h2 className="px-4">COURSE NAME: {application.FormDetails.course}</h2>
                <h3 className="px-4">Role: {application.FormDetails.position}</h3>
              </div>

              {/* Update button */}
              <div className="flex flex-row-reverse px-4">
                <button
                  onClick={() =>
                    handleUpdate(
                      application.FormDetails.course,
                      course_code,
                      application.FormDetails.role
                    )
                  }
                  className="underline hover:text-gray-500"
                >
                  Update Application
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default SubmittedApplications;
