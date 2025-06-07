import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Select,
  Button,
  useToast,
  Stack,
  FormControl,
  FormLabel,
  Text,
} from "@chakra-ui/react";
import { courseService } from "@/services/courseService";
import { userService } from "@/services/userService"; 
import { Course, LecturerCourseAssignment ,User} from "@/types/type";

const AssignLecturer = () => {
  const toast = useToast();
  const [lecturers, setLecturers] = useState<User[]>([]);
  const [semester, setSemester] = useState("");
const [assignments, setAssignments] = useState<LecturerCourseAssignment[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedLecturerId, setSelectedLecturerId] = useState<number | null>(null);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);

  const fetchLecturersAndCourses = async () => {
    try {
      const users = await userService.getAllUsers(); // You’ll need to filter below
      const onlyLecturers = users.filter((u) => u.roleId === 1); 
      setLecturers(onlyLecturers);

      const courseList = await courseService.getCourses();
      setCourses(courseList);
    } catch {
      toast({ title: "Failed to load data.", status: "error" });
    }
  };

  const handleAssign = async () => {
   if (!selectedLecturerId || !selectedCourseId || !semester) {
  toast({ title: "All fields are required", status: "warning" });
  return;
}

try {
  await courseService.assignLecturerToCourse(selectedLecturerId, selectedCourseId, semester);
  toast({ title: "Lecturer assigned successfully!", status: "success" });
  setSelectedLecturerId(null);
  setSelectedCourseId(null);
  setSemester(""); // clear form
} catch (error) {
  console.error("Assignment failed:", error);
  toast({ title: "Assignment failed.", status: "error" });
}

  };
  const fetchAssignedLecturers = async () => {
  const data = await courseService.getAllAssignedLecturers();
  setAssignments(data);
};

  useEffect(() => {
    fetchLecturersAndCourses();
    fetchAssignedLecturers();
  }, []);

  return (
    <Box p={6} maxW="600px" mx="auto">
      <Heading mb={4}>Assign Lecturer to Course</Heading>

      <Stack spacing={4} mb={6}>
        <FormControl>
          <FormLabel>Lecturer</FormLabel>
          <Select
            placeholder="Select Lecturer"
            value={selectedLecturerId ?? ""}
            onChange={(e) => setSelectedLecturerId(Number(e.target.value))}
          >
            {lecturers.map((lecturer) => (
              <option key={lecturer.id} value={lecturer.id}>
                {lecturer.firstName} {lecturer.lastName}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Course</FormLabel>
          <Select
            placeholder="Select Course"
            value={selectedCourseId ?? ""}
            onChange={(e) => setSelectedCourseId(Number(e.target.value))}
          >
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.courseName}
              </option>
            ))}
          </Select>
        </FormControl><FormControl>
  <FormLabel>Semester</FormLabel>
  <Select
    placeholder="Select Semester"
    value={semester}
    onChange={(e) => setSemester(e.target.value)}
  >
    <option value="S1-2025">S1-2025</option>
    <option value="S2-2025">S2-2025</option>
    <option value="Summer-2025">Summer-2025</option>
  </Select>
</FormControl>


        <Button onClick={handleAssign} colorScheme="blue">
          Assign Lecturer
        </Button>
      </Stack>
      <Heading size="md" mt={10}>Current Assignments</Heading>
{assignments.map((a) => (
  <Box key={a.id} p={3} borderWidth={1} borderRadius="md" my={2}>
    <Text><strong>Lecturer:</strong> {a.lecturer.firstName} {a.lecturer.lastName}</Text>
    <Text><strong>Course:</strong> {a.course.courseName}</Text>
    <Text><strong>Semester:</strong> {a.semester}</Text>
  </Box>
))}


      {lecturers.length === 0 && <Text>No lecturers found.</Text>}
      {courses.length === 0 && <Text>No courses available.</Text>}
    </Box>
  );
};

export default AssignLecturer;
