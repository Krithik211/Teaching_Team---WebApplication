// pages/overview.tsx
import Head from "next/head";
import { useRouter } from "next/router";
import Navigation from "@/components/Navigation";
import DashboardView from "@/components/DashboardView";
import { useSelectionStatsFromAPI } from "@/hooks/useSelectionStats";
import { useProtectedRoute } from "@/hooks/useProtectedRoutes";

const OverviewPage = () => {
  useProtectedRoute("lecturer");
  const stats = useSelectionStatsFromAPI();
  const router = useRouter();

  const handleBack = () => {
    router.push("/lecturer"); // Always go to Lecturer dashboard
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-28 pb-10 font-poppins">
      <Head>
        <title>Selection Overview - Teaching Team</title>
      </Head>
      <Navigation showSignOut={true} />

      <div className="max-w-5xl mx-auto px-4 space-y-6">
        <button
          onClick={handleBack}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition"
        >
          ← Back to Lecturer Dashboard
        </button>

        <section className="bg-white p-6 rounded-lg shadow mb-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Selection Overview
          </h3>
          <DashboardView data={stats} />
        </section>
      </div>
    </div>
  );
};

export default OverviewPage;
