// --- Component: DashboardView.tsx ---
import {
  Box,
  Text,
  UnorderedList,
  ListItem,
  Divider,
} from "@chakra-ui/react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
} from "recharts";

interface CourseComputedStats {
  mostChosen: any;
  leastChosen: any;
  notChosen: { name: string; email: string }[];
}

interface DashboardViewProps {
  courseStats: Record<string, Record<string, CourseComputedStats>>;
}

const DashboardView = ({ courseStats }: DashboardViewProps) => {
  return (
    <>
      {Object.entries(courseStats).map(([course, positionStats]) => (
        <Box key={course} mb={12} borderWidth="1px" borderRadius="lg" p={6}>
          <Text fontSize="xl" fontWeight="bold" mb={4}>Course: {course}</Text>

          {Object.entries(positionStats).map(([position, stats]) => {
            const chartData = [
              { label: stats.mostChosen?.label || "N/A", count: stats.mostChosen?.count || 0 },
              { label: stats.leastChosen?.label || "N/A", count: stats.leastChosen?.count || 0 },
              { label: "Not Chosen", count: stats.notChosen.length },
            ];

            return (
              <Box key={position} mb={8}>
                <Text fontSize="lg" fontWeight="semibold">Position: {position}</Text>

                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="label" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#3182CE">
                      <LabelList dataKey="count" position="top" />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>

                <Divider my={4} />
                <Text fontWeight="semibold">Most Chosen Applicant:</Text>
                {stats.mostChosen ? (
                  <UnorderedList>
                    <ListItem>Name: {stats.mostChosen.name}</ListItem>
                    <ListItem>Email: {stats.mostChosen.email}</ListItem>
                    <ListItem>Lecturers: {stats.mostChosen.count}</ListItem>
                  </UnorderedList>
                ) : <Text>No applicant ranked</Text>}

                <Text fontWeight="semibold" mt={4}>Least Chosen Applicant:</Text>
                {stats.leastChosen ? (
                  <UnorderedList>
                    <ListItem>Name: {stats.leastChosen.name}</ListItem>
                    <ListItem>Email: {stats.leastChosen.email}</ListItem>
                    <ListItem>Lecturers: {stats.leastChosen.count}</ListItem>
                  </UnorderedList>
                ) : <Text>No applicant ranked</Text>}

                <Text fontWeight="semibold" mt={4}>Not Chosen Applicants:</Text>
                {stats.notChosen.length > 0 ? (
                  <UnorderedList>
                    {stats.notChosen.map((a) => (
                      <ListItem key={a.email}>{a.name}</ListItem>
                    ))}
                  </UnorderedList>
                ) : <Text>All applicants were ranked</Text>}
              </Box>
            );
          })}
        </Box>
      ))}
    </>
  );
};

export default DashboardView;