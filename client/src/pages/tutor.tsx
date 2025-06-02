// Tutor dashboard page for applying to available courses and viewing submitted applications.
// Access restricted to users with the "tutor" role.
//Used course card and submitted applications components.

import Head from "next/head";
import Navigation from "../components/Navigation";
import CourseCard from "@/components/CourseCard";
import { useProtectedRoute } from "@/hooks/useProtectedRoutes";
import SubmittedApplications from "@/components/SubmittedApplications";
import Footer from "@/components/Footer";

export default function TutorDashboard() {
  // Restrict access to tutors only
  useProtectedRoute("candidate");

  return (
    <>
      <Head>
        <title>Apply as a Tutor - Teaching Team</title>
        <meta name="description" content="Tutor application form - Teaching Team" />
      </Head>

      {/* Top navigation bar with sign-out button */}
      <Navigation showSignOut={true} />

      {/* Available courses to apply for */}
      <div className="mt-30">
        <h1 className="text-3xl text-gray-900 mb-10 px-10">Available Courses</h1>
        <CourseCard />
      </div>

      {/* Section showing already submitted applications */}
      <div className="mt-20">
        <h1 className="text-3xl text-gray-900 mb-10 px-10">Submitted Applications</h1>
        <SubmittedApplications />
      </div>

      {/* Footer section */}
      <Footer />
    </>
  );
};
