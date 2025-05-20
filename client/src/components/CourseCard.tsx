/*
Course card component which is used for creating a card structure for each current semester courses with their details 
and apply button which will send course name, course code, role.
current semester courses list are stored in useCourse context.
*/
import { useCourse } from "@/context/CourseContext";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const CourseCard = () => {
  const { currentSemesterCourses } = useCourse();
  const router = useRouter();
  const { currentUser } = useAuth();

  // Handles tutor application process for a specific course
  const handleApplyNow = (course_name: string, course_code: string, role: string) => {
    const key = `${course_code}_${currentUser?.email}`;
    const allTutorApplications = JSON.parse(localStorage.getItem("tutorApplications") || "{}");

    // Show message if user already applied for the course
    if (allTutorApplications[key]) {
      toast.info("Application already submitted.", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    // Save application state and redirect to application form
    const applyingState = {
      courseCode: course_code,
      courseName: course_name,
      role: role,
      isApplying: true,
      isUpdating: false,
    };

    localStorage.setItem("tutorApplicationState", JSON.stringify(applyingState));
    router.push("/tutorApplicationForm");
  };

  return (
    <>
      {/* Display list of available courses for application */}
      <div className="max-h-[500px] overflow-y-auto mx-30 mb-10 px-4 border border-gray-200 rounded-none shadow-inner">
        {currentSemesterCourses?.map((course, index) => (
          <div
            key={index}
            className="flex flex-1 mt-4 mb-4 mx-10 p-6 text-1xl shadow-md bg-blue-100 text-gray-900 rounded-none justify-between"
          >
            {/* Course details */}
            <div className="flex flex-row">
              <h1>COURSE CODE: {course.course_code}</h1>
              <h2 className="px-4">COURSE NAME: {course.course_name}</h2>
              <h3 className="px-4">Role: {course.role}</h3>
            </div>

            {/* Apply button */}
            <div className="flex flex-row-reverse px-4">
              <button
                onClick={() =>
                  handleApplyNow(course.course_name, course.course_code, course.role)
                }
                className="underline hover:text-gray-500"
              >
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Toast container for feedback messages */}
      <ToastContainer />
    </>
  );
};

export default CourseCard;
