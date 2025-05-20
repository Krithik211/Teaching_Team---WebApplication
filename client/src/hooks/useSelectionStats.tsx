// custom hook for calculating the most, least chosen and unselected applicants.
//Based on the emails from selected applicants the stats are calculated.

import { useState, useEffect } from "react";

type Stats = {
  mostSelectedNames: string[];
  mostSelectedCount: number;
  leastSelectedNames: string[];
  leastSelectedCount: number;
  unselected: string[];
};

export function useSelectionStats() {

  const [stats, setStats] = useState<Stats>({
    mostSelectedNames: [],
    mostSelectedCount: 0,
    leastSelectedNames: [],
    leastSelectedCount: 0,
    unselected: [],
  });

  useEffect(() => {

    function calculateStats() {
      const allApplications = JSON.parse(localStorage.getItem("tutorApplications") || "{}");

      const tutorApplicants = Object.entries(allApplications).map(
        ([key, value]:[string, any]) => {
          const form = value.FormDetails;
          const [, email] = key.split("_"); // Extract email from "courseCode_email"
          return {
            applicationId: key,
            name: `${form.firstName} ${form.lastName}`,
            email: email
          };
        }
      );
      
      // Create a set of all applicant emails
      const allEmails = new Set(tutorApplicants.map(app => app.email));

      const selectedEmails = new Set<string>();

      //stores a list of emails from selected applicants
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith("lecturer_") && key.includes("_selectedApplicants")) {
          const selections = JSON.parse(localStorage.getItem(key)!);
          if (Array.isArray(selections)) {
            selections.forEach(sel => {
              const [, email] = sel.applicationId.split("_");
              selectedEmails.add(email);
            });
          }
        }
      }

      // Aggregate selection counts from lecturer selection objects.
      const selectionCounts: Record<string, number> = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        // Keys that represent lecturer selections (e.g., lecturer_<email>_selectedApplicants).
        if (key && key.startsWith("lecturer_") && key.includes("_selectedApplicants")) {
          const selections = JSON.parse(localStorage.getItem(key)!);
          if (Array.isArray(selections)) {
            selections.forEach((sel: any) => {
              if (sel && sel.applicationId) {
                const [, email] = sel.applicationId.split("_");
                selectionCounts[email] = (selectionCounts[email] || 0) + 1;
              }
            });
          }
        }
      }
      let highestCount = 0;
      let lowestCount = Infinity;
      const mostSelected: string[] = [];
      const leastSelected: string[] = [];

      const emailToName = new Map<string, string>();

      tutorApplicants.forEach(app => {
        if (!emailToName.has(app.email)) {
          emailToName.set(app.email, app.name);
        }
      });

      for (const email of emailToName.keys()) {
        const count = selectionCounts[email] || 0;

        // Track most selected
        if (count > highestCount) {
          highestCount = count;
          mostSelected.length = 0; // Clear existing if it's greater than count which may be multiple names
          mostSelected.push(emailToName.get(email)!);
        } //for multiple most chosen
        else if (count === highestCount && count > 0) {
          mostSelected.push(emailToName.get(email)!);
        }

        // Track least selected (count > 0 only)
        if (count > 0 && count < lowestCount) {
          lowestCount = count;
          leastSelected.length = 0;
          leastSelected.push(emailToName.get(email)!);
        } else if (count === lowestCount && count > 0) {
          leastSelected.push(emailToName.get(email)!);
        }
      }
      //comparing all emails with selected emails to filter unselected
      const unselectedEmails = Array.from(allEmails).filter(email => !selectedEmails.has(email));

      const unselected = Array.from(
        new Set(
          tutorApplicants
            .filter(app => unselectedEmails.includes(app.email))
            .map(app => app.name)
        )
      );

      setStats({
        mostSelectedNames: mostSelected,
        mostSelectedCount: highestCount > 0 ? highestCount : 0,
        leastSelectedNames: leastSelected,
        leastSelectedCount: lowestCount < Infinity ? lowestCount : 0,
        unselected,
      });
    }

    calculateStats();
    window.addEventListener("storage", calculateStats);
    return () => {
      window.removeEventListener("storage", calculateStats);
    };
  }, []);

  return stats;
}
