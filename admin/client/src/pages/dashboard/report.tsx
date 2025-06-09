import { useEffect, useState } from "react";
import { applicationService } from "@/services/rankService";
import { TutorApplication } from "@/types/type";

const RankedAppList = () => {
  const [applications, setApplications] = useState<TutorApplication[]>([]);
  const [allApplicants, setAllApplicants] = useState<TutorApplication[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const ranked = await applicationService.getAllRankedApplications();
      setApplications(ranked);

      // If you want unchosen candidates too:
      const all = await applicationService.getAllApplications();
      setAllApplicants(all);
    };

    fetchData();
  }, []);

  // 1. Grouped by course
const groupedByCourse: Record<string, TutorApplication[]> = {};

applications.forEach(app => {
  const course = app.courseCode;
  if (!groupedByCourse[course]) groupedByCourse[course] = [];

  const alreadyAdded = groupedByCourse[course].some(a => a.email === app.email);
  if (!alreadyAdded) {
    groupedByCourse[course].push(app);
  }
});

  // 2. Chosen for more than 3 courses
  const countByEmail: Record<string, number> = {};
  applications.forEach(app => {
    countByEmail[app.email] = (countByEmail[app.email] || 0) + 1;
  });
  const moreThanThree = [...new Set(applications.filter(app => countByEmail[app.email] > 3).map(a => a.email))];

  // 3. Not chosen at all (compare allApplicants vs applications)
  // Remove duplicates
  const uniqueAllApplicants = Array.from(
    new Map(allApplicants.map(app => [app.email, app])).values()
  );

  // Filter out chosen ones
  const unchosen = uniqueAllApplicants.filter(
    a => !applications.some(r => r.applicationID === a.applicationID)
  );

  return (
    <div>
      <h2>Admin Reports</h2>

      {/* Report 1 */}
      <h3>1. Candidates Chosen for Each Course</h3>
      {Object.entries(groupedByCourse).map(([courseCode, apps]) => (
        <div key={courseCode}>
          <strong>
            {apps[0]?.course} ({courseCode})
          </strong>
          <ul>
            {apps.map(app => (
              <li key={app.applicationID}>
                {app.firstName} {app.lastName}
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* Report 2 */}
      <h3>2. Candidates Chosen for More Than 3 Courses</h3>
      <ul>
        {moreThanThree.map(email => {
          const sample = applications.find(a => a.email === email)!;
          return (
            <li key={email}>
              {sample.firstName} {sample.lastName}
            </li>
          );
        })}
      </ul>

      {/* Report 3 */}
      <h3>3. Candidates Not Chosen for Any Course</h3>
      <ul>
        {unchosen.map(app => (
          <li key={app.applicationID}>
            {app.firstName} {app.lastName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RankedAppList;
