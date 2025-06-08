// --- Frontend Hook: useCourseStats.ts ---
import { useEffect, useState } from "react";
import { userApi } from "@/services/api";
import { useToast } from "@chakra-ui/react";

interface Applicant {
  name: string;
  email: string;
}

interface RankGroup {
  [rankLevel: string]: Applicant[];
}

interface CourseComputedStats {
  mostChosen: any;
  leastChosen: any;
  notChosen: Applicant[];
}

const computeStats = (rankGroups: RankGroup): CourseComputedStats => {
  const entries = Object.entries(rankGroups);

  let mostChosen = null;
  let leastChosen = null;
  let notChosen: Applicant[] = [];

  entries.forEach(([rank, applicants]) => {
    if (rank === "Not Ranked") {
      notChosen = applicants;
    } else {
      if (!mostChosen || applicants.length > mostChosen.count) {
        mostChosen = { label: rank, count: applicants.length, ...applicants[0] };
      }
      if (!leastChosen || applicants.length < leastChosen.count) {
        leastChosen = { label: rank, count: applicants.length, ...applicants[0] };
      }
    }
  });

  return { mostChosen, leastChosen, notChosen };
};

export const useCourseStats = () => {
  const [courseStats, setCourseStats] = useState<Record<string, Record<string, CourseComputedStats>>>({});
  const toast = useToast();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const rawStats = await userApi.getStats();
        const computed: Record<string, Record<string, CourseComputedStats>> = {};

        for (const [course, positions] of Object.entries(rawStats)) {
          computed[course] = {};
          for (const [position, rankGroups] of Object.entries(positions as any)) {
            computed[course][position] = computeStats(rankGroups as RankGroup);
          }
        }

        setCourseStats(computed);
      } catch (err) {
        console.error(err);
        toast({ title: "Failed to load stats", status: "error", duration: 4000, isClosable: true });
      }
    };

    fetchStats();
  }, []);

  return courseStats;
};