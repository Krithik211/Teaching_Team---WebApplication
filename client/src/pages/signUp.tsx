// Sign-up page for the Teaching Team app.
// Displays a placeholder message indicating sign-up is under development.

import Head from "next/head";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <>
      <Head>
        <title>Sign Up - Teaching Team</title>
      </Head>

      {/* Use simplified nav bar with only Home link */}
      <Navigation showHome={true} />

      {/* Centered sign-up section */}
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 font-poppins px-4 pt-20">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Sign Up for Teaching Team
          </h1>

          {/* Placeholder content */}
          <p className="text-gray-700 mb-6">
            Registration is currently under development for this assessment.
            Please use the sign-in option to access your account. The full sign-up
            feature will be implemented in a future update.
          </p>

          {/* Link to return to sign-in */}
          <div className="text-center">
            <Link href="/signIn" className="text-indigo-600 hover:underline">
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Footer section */}
      <Footer />
    </>
  );
}
