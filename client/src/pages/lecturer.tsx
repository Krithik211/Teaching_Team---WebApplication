// Lecturer dashboard page for reviewing, selecting, and ranking tutor applicants.
// Provides features like filtering, sorting, commenting, and visual representation of selections.
//selection logic: when select button clicked it sets true on selectionformopen then shows the rank & comment inputs for submiting 
// if not then it is already selected it shows the rank and comment section and sets the update button.
//Toggle view for showing applicant details storing the applicants on expand when view details button is clicked and enables the view option 
// if it clicked again (hide details) then it removes the applicant in expand that closes the view details.


import Head from "next/head";
import Navigation from "../components/Navigation";
import React, { useEffect, useState } from "react";
import { useSelectionStats } from "../hooks/useSelectionStats";
import { useAuth } from "@/context/AuthContext";
import { useProtectedRoute } from "@/hooks/useProtectedRoutes";
import { useCourse } from "@/context/CourseContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";
 
// Type for tutor applicant data.
type Applicant = {
  applicationId: string;
  name: string;
  email: string;
  course: string;
  availability: string;
  skills: string;
  academics: string;
};
 
// Type for lecturer-selected applicant details.
type SelectedApplicant = {
  applicationId: string;
  rank: "" | "topChoice" | "strongCandidate" | "considered";
  comment: string;
};
 
export default function LecturerPage() {
  useProtectedRoute("lecturer");
  const { currentUser } = useAuth();
  const { currentSemesterCourses } = useCourse();
  const [error, setError] = useState("");
  const [applicantNotFoundError, setApplicantNotFoundError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectionFormOpen, setSelectionFormOpen] = useState<string[]>([]);
  const [tempSelection, setTempSelection] = useState<Record<string, { rank: string; comment: string }>>({});
 
  //For storing all applicants, filtered applicants for searching criteria, expanded for view details of applicants
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [filtered, setFiltered] = useState<Applicant[]>([]);
  const [expanded, setExpanded] = useState<string[]>([]);
 
  // Filter criteria states.
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedApplicant, setSelectedApplicant] = useState("");
  const [availability, setAvailability] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");
  const [sortOption, setSortOption] = useState("");
 
  // Lecturer's selection list.
  const [selectedApplicants, setSelectedApplicants] = useState<SelectedApplicant[]>([]);
  const [toast, setToast] = useState("");
  // A single state variable for inline selection errors.
  const [selectionErrors, setSelectionErrors] = useState<Record<string, string>>({});
 
  const [mounted, setMounted] = useState(false);
  const [keyPrefix, setKeyPrefix] = useState("");
 
  // Get aggregated statistics using the custom hook.
  const { mostSelectedNames, mostSelectedCount, leastSelectedNames, leastSelectedCount, unselected } = useSelectionStats();
 
  // Clear toast after a delay.
  useEffect(() => {
    if (toast) {
      const timeout = setTimeout(() => setToast(""), 2500);
      return () => clearTimeout(timeout);
    }
  }, [toast]);
 
  useEffect(() => {
    setMounted(true);
  }, []);
 
  // Load tutor applications.
  useEffect(() => {
    if (!currentUser) return;
    const prefix = `lecturer_${currentUser.email}`;
    setKeyPrefix(prefix);
 
    const allApplications = localStorage.getItem("tutorApplications");
    if (allApplications) {
      setApplicantNotFoundError("");
      const parsed = JSON.parse(allApplications);
      const tutorApplicants: Applicant[] = Object.entries(parsed).map(
        ([key, value]: [string, any]) => {
          const form = value.FormDetails;
          // Optionally split key if needed.
          // const [courseCode, email] = key.split("_");
          return {
            applicationId: key,
            name: `${form.firstName} ${form.lastName}`,
            email: form.email,
            course: form.course,
            availability: form.availability,
            skills: form.skills,
            academics: form.qualification,
          };
        }
      );
      setApplicants(tutorApplicants);
      setFiltered(tutorApplicants);
    }
    else{
      setApplicantNotFoundError("No applications submitted by tutor so far...");
    }
  }, [currentUser]);
 
  // Load lecturer's selections from localStorage.
  useEffect(() => {
    if (!keyPrefix) return;
    const storedSelections = localStorage.getItem(`${keyPrefix}_selectedApplicants`);
    if (storedSelections) {
      setSelectedApplicants(JSON.parse(storedSelections));
    }
  }, [keyPrefix]);
 
  // Filtering function.
  const handleSearch = () => {
    let result = applicants;
    if (!selectedCourse && !selectedApplicant && !availability && !selectedSkill && !sortOption) {
      setError("At least one field required for search");
    } 
    else {
      setLoading(true);

      setTimeout(() => {
      if (selectedCourse) result = result.filter(app => app.course === selectedCourse);
      if (selectedApplicant) result = result.filter(app => app.name === selectedApplicant);
      if (availability) result = result.filter(app => app.availability === availability);
      if (selectedSkill) {
        result = result.filter(app =>
          app.skills.toLowerCase().includes(selectedSkill.toLowerCase())
        );
      }
      if (sortOption === "course") {
        result = [...result].sort((a, b) => a.course.localeCompare(b.course));
      } else if (sortOption === "availability") {
        result = [...result].sort((a, b) => a.availability.localeCompare(b.availability));
      }
      setFiltered(result);
      setError("");
      setLoading(false);
      if (result.length === 0) {
        setApplicantNotFoundError("No Applicants found.");
        return;
      }
      setApplicantNotFoundError("");
    }, 800)
    }
  };
  
  //Filter clearing function
  const handleClearFilters = () => {
    setSelectedCourse("");
    setSelectedApplicant("");
    setSelectedSkill("");
    setAvailability("");
    setSortOption("");
    setFiltered(applicants);
    setError("");
    if (applicants.length === 0) 
      setApplicantNotFoundError("No applications submitted by tutor so far...");
    else
      setApplicantNotFoundError("");
  };
 
  // Toggle details view.
  const toggleDetails = (applicationId: string) => {
    setExpanded((prev) =>
      prev.includes(applicationId)
        ? prev.filter((id) => id !== applicationId)
        : [...prev, applicationId]
    );
  };
 
  //Selection Functions
  const handleAddSelection = (applicationId: string) => {
    setSelectionFormOpen(prev => [...prev, applicationId]);
    setTempSelection(prev => ({
      ...prev,
      [applicationId]: { rank: "", comment: "" }
    }));
  };
  
  //selection removing function
  const handleRemoveSelection = (applicationId: string) => {
    const updated = selectedApplicants.filter(entry => entry.applicationId !== applicationId);
    setSelectedApplicants(updated);
    localStorage.setItem(`${keyPrefix}_selectedApplicants`, JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
    setToast("Applicant unselected");
    setExpanded(prev => prev.filter(id => id !== applicationId));
    setSelectionFormOpen(prev => prev.filter(id => id !== applicationId));
    setTempSelection(prev => {
      const newState = { ...prev };
      delete newState[applicationId];
      return newState;
    });
  };  
  
  //updating the changes function
  const handleRankChange = (applicationId: string, rank: string) => {
    setTempSelection(prev => ({
      ...prev,
      [applicationId]: {
        ...prev[applicationId],
        rank
      },
    }));
  };
  
  const handleCommentChange = (applicationId: string, comment: string) => {
    setTempSelection(prev => ({
      ...prev,
      [applicationId]: {
        ...prev[applicationId],
        comment
      },
    }));
  };

  //cancel selection process of the applicant
  const handleCancelSelection = (applicationId: string) => {
    setSelectionFormOpen(prev => prev.filter(id => id !== applicationId));
    setTempSelection(prev => {
      const updated = { ...prev };
      delete updated[applicationId];
      return updated;
    });
  };
 
  //submitting the selected applicant function
  const handleSubmitSelection = (applicationId: string) => {
    const draft = tempSelection[applicationId];
  
    if (!draft || (!draft.rank && !draft.comment.trim())) {
      setSelectionErrors(prev => ({
        ...prev,
        [applicationId]: "Please enter a rank or comment.",
      }));
      return;
    }
  
    setSelectionErrors(prev => {
      const newState = { ...prev };
      delete newState[applicationId];
      return newState;
    });
  
    const existing = selectedApplicants.find(entry => entry.applicationId === applicationId);
    let updatedApplicants: SelectedApplicant[];
  
    //updating the details of selected applicant
    if (existing) {
      updatedApplicants = selectedApplicants.map(entry =>
        entry.applicationId === applicationId
          ? {
              ...entry,
              rank: draft.rank as SelectedApplicant["rank"],
              comment: draft.comment,
            }
          : entry
      );
      setToast("Selection updated");
    }
     else {
      // add new selected applicant
      const newEntry: SelectedApplicant = {
        applicationId,
        rank: draft.rank as "" | "topChoice" | "strongCandidate" | "considered",
        comment: draft.comment
      };
      updatedApplicants = [...selectedApplicants, newEntry];
      setToast("Applicant selected");
    }
  
    setSelectedApplicants(updatedApplicants);
    localStorage.setItem(`${keyPrefix}_selectedApplicants`, JSON.stringify(updatedApplicants));
    window.dispatchEvent(new Event("storage"));
  
    // cleanup
    setSelectionFormOpen(prev => prev.filter(id => id !== applicationId));
    setTempSelection(prev => {
      const newState = { ...prev };
      delete newState[applicationId];
      return newState;
    });
  };

  //for displaying the rank in the UI
  const getRankLabel = (rank: SelectedApplicant["rank"]) => {
    switch (rank) {
      case "topChoice":
        return "Top Choice";
      case "strongCandidate":
        return "Strong Candidate";
      case "considered":
        return "Can Be Considered";
      default:
        return "-";
    }
  };
  
  
  // --- End Selection Functions ---
 
  // Prepare chart data with actual counts.
  const chartData = [
    { name: "Most Selected", count: mostSelectedCount },
    { name: "Least Selected", count: leastSelectedCount },
    { name: "Unselected", count: unselected.length },
  ];

  return (
    <div className="min-h-screen bg-gray-100 pt-28 pb-10 font-poppins">
      <Head>
        <title>Lecturer Panel - Teaching Team</title>
      </Head>
      <Navigation showSignOut={true} />
      <div className="max-w-5xl mx-auto px-4 space-y-6">
        {/* Visual Representation Section */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Selection Overview</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} label={{ value: "Count", angle: -90, position: "insideLeft" }} />
              <Tooltip />
              <Bar dataKey="count" radius={[8, 8, 0, 0]} label={{ position: "top", fill: "#374151", fontSize: 12 }}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.name === "Most Selected"
                        ? "#10b981"
                        : entry.name === "Least Selected"
                        ? "#ef4444"
                        : "#9ca3af"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          {mounted && (
            <div className="text-sm mt-4 text-gray-600">
              <p>
                <strong>Most Selected:</strong>{" "}
                {mostSelectedNames.length > 0
                  ? `${mostSelectedNames.join(", ")} (Count: ${mostSelectedCount})`
                  : "-"}
              </p>
              <p>
                <strong>Least Selected:</strong>{" "}
                {leastSelectedNames.length > 0
                  ? `${leastSelectedNames.join(", ")} (Count: ${leastSelectedCount})`
                  : "-"}
              </p>
              <p>
                <strong>Unselected Applicants:</strong>{" "}
                {unselected.length > 0 ? unselected.join(", ") : "None"}
              </p>
            </div>
          )}
        </div>
 
        {/* Search & Filter Controls */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800"
              >
                <option value="">Select a course</option>
                {currentSemesterCourses?.map((course, index) => (
                  <option key={index} value={course.course_name}>
                    {course.course_name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Applicant Name</label>
              <select
                value={selectedApplicant}
                onChange={(e) => setSelectedApplicant(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800"
              >
                <option value="">Select applicant</option>
                {[...new Set(applicants.map((app) => app.name))].map((name, i) => (
                  <option key={i} value={name}>{name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Skill</label>
              <input
                type="text"
                placeholder="Search by skill"
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800"
              >
                <option value="">None</option>
                <option value="course">Course Name</option>
                <option value="availability">Availability</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800"
              >
                <option value="">Select availability</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
              </select>
            </div>
            <div className="md:col-span-2 flex justify-center items-center gap-4 text-center mt-2">
              <button
                onClick={handleSearch}
                disabled={loading}
              className={`font-semibold py-2 px-8 rounded-md shadow transition ${
              loading
              ? "bg-indigo-400 text-white cursor-not-allowed"
              : "bg-indigo-600 text-white hover:bg-indigo-700"}`}
            >
              {loading ? "Searching..." : "Search"}
              </button>
              <button
                onClick={handleClearFilters}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md shadow"
                type="button"
              >
                Clear Filters
              </button>
            </div>
            {error && (
              <div className="md:col-span-2 text-center mt-2 text-red-700">
                {error}
              </div>
            )}
          </div>
        </div>
 
        {/* Applicants List with Selection & Extra Details */}
        {applicantNotFoundError && (
          <div className="mt-20 text-center text-red-700 text-2xl bg-white rounded-lg p-6 shadow border border-gray-200">
            {applicantNotFoundError}
          </div>
        )}
        {!applicantNotFoundError && (
          <div className="space-y-6">
            {filtered.map((app, index) => {
              const selectionEntry = selectedApplicants.find(
                entry => entry.applicationId === app.applicationId
              );
              console.log("Rendering Select for:", app.applicationId, "Entry:", selectionEntry);
              return (
                <div key={index} className="bg-white rounded-lg p-6 shadow border border-gray-200">
                  {/* Applicant Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img src="/images/placeholder1.png" alt="Avatar" className="w-12 h-12 rounded-full object-cover" />
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">{app.name}</h3>
                        <p className="text-sm text-gray-600">{app.course}</p>
                        <p className="text-sm text-gray-600">{app.availability}</p>
                      </div>
                    </div>
                    {!selectionEntry ? (
                      <button
                        onClick={() => handleAddSelection(app.applicationId)}
                        className="text-sm px-4 py-2 rounded bg-teal-600 text-white hover:bg-teal-700"
                      >
                        Select
                      </button>
                    ) : !selectionFormOpen.includes(app.applicationId) && (
                      <div className="flex flex-col items-end">
                        <span className="text-xl font-semibold text-green-600">Selected</span>
                        <button
                          onClick={() => handleRemoveSelection(app.applicationId)}
                          className="mt-1 text-sm px-4 py-2 rounded bg-gray-400 text-black hover:bg-gray-500"
                        >
                          Unselect
                        </button>
                      </div>
                    )}

                  </div>
 
                  {/* Toggle Details */}
                  <button
                    className="text-sm text-indigo-600 hover:underline mt-2"
                    onClick={() => toggleDetails(app.applicationId)}
                  >
                    {expanded.includes(app.applicationId) ? "Hide Details" : "View Details"}
                  </button>
 
                  {expanded.includes(app.applicationId) && (
                    <div className="mt-4 border-t pt-4 space-y-3 text-sm text-gray-700">
                      <p><strong>Academics:</strong> {app.academics}</p>
                      <p><strong>Skills:</strong></p>
                      <div className="flex flex-wrap gap-2">
                        {app.skills.split(",").map((skill, i) => (
                          <span key={i} className="bg-gray-200 px-3 py-1 rounded-full text-xs">{skill.trim()}</span>
                        ))}
                      </div>
                    </div>
                  )}
 
                    {selectionFormOpen.includes(app.applicationId) || selectionEntry ? (
                      <>
                        {selectionFormOpen.includes(app.applicationId) ? (
                          //  Rank + comment form
                          <div className="mt-4 p-2 text-black border-t">
                            <div className="mb-2 text-sm font-medium">Selection Details</div>
                            <div className="space-y-3">
                              <div className="text-sm">
                                <label className="font-semibold block mb-1">Rank</label>
                                <div className="flex space-x-4">
                                  {["topChoice", "strongCandidate", "considered"].map((rankOption) => (
                                    <label key={rankOption} className="flex items-center space-x-1">
                                      <input
                                        type="radio"
                                        name={`rank_${app.applicationId}`}
                                        value={rankOption}
                                        checked={tempSelection[app.applicationId]?.rank === rankOption}
                                        onChange={() => handleRankChange(app.applicationId, rankOption)}
                                      />
                                      <span>{rankOption === "topChoice"
                                        ? "Top Choice"
                                        : rankOption === "strongCandidate"
                                        ? "Strong Candidate"
                                        : "Can Be Considered"}</span>
                                    </label>
                                  ))}
                                </div>
                              </div>
                              <div className="text-sm">
                                <label className="font-semibold block mb-1">Comment</label>
                                <textarea
                                  className="w-full px-2 py-1 border rounded"
                                  rows={2}
                                  value={tempSelection[app.applicationId]?.comment || ""}
                                  onChange={(e) => handleCommentChange(app.applicationId, e.target.value)}
                                />
                                {selectionErrors[app.applicationId] && (
                                  <span className="text-red-600 text-xs">
                                    {selectionErrors[app.applicationId]}
                                  </span>
                                )}
                              </div>
                              <div className="flex gap-3 mt-2">
                                <button
                                  onClick={() => handleSubmitSelection(app.applicationId)}
                                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1 rounded text-sm"
                                >
                                  Submit Choice & Comment
                                </button>
                                <button
                                  onClick={() => handleCancelSelection(app.applicationId)}
                                  className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-1 rounded text-sm"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          //  Summary view after submit
                          <div className="mt-2 flex justify-between text-sm text-gray-700 border-t pt-2">
                            <div>
                              <p><strong>Rank:</strong> {getRankLabel(selectionEntry?.rank || "")}</p>
                              <p><strong>Comment:</strong> {selectionEntry?.comment || ""}</p>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  setSelectionFormOpen(prev => [...prev, app.applicationId]);
                                  setTempSelection(prev => ({
                                    ...prev,
                                    [app.applicationId]: {
                                      rank: selectionEntry?.rank || "",
                                      comment: selectionEntry?.comment || ""
                                    }
                                  }));
                                }}
                                className="text-indigo-600 hover:underline"
                              >
                                Update
                              </button>
                            </div>
                          </div>
                        )}
                      </>
                    ) :null}
                </div>
              );
            })}
          </div>
        )}
        {toast && (
          <div className="fixed bottom-6 right-6 bg-black text-white px-4 py-2 rounded shadow-lg z-50 animate-fade-in-out">
            {toast}
          </div>
        )}
      </div>
    </div>
  );
}