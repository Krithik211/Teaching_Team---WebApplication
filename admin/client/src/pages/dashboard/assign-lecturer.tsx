import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Paper,
  Grid,
  Divider,
} from "@mui/material";
import { courseService } from "@/services/courseService";
import { userService } from "@/services/userService";
import { Course, LecturerCourseAssignment, User } from "@/types/type";

const AssignLecturer = () => {
  const [lecturers, setLecturers] = useState<User[]>([]);
  const [semester, setSemester] = useState(null);
  const [assignments, setAssignments] = useState<LecturerCourseAssignment[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedLecturerId, setSelectedLecturerId] = useState<number | null>(null);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);

  const fetchLecturersAndCourses = async () => {
    try {
      const users = await userService.getAllUsers();
      console.log('users', users);
      const onlyLecturers = users.filter((u) => u.role === 'lecturer');
      setLecturers(onlyLecturers);

      const courseList = await courseService.getCourses();
      setCourses(courseList);
    } catch {
      alert("Failed to load data.");
    }
  };

  const handleAssign = async () => {
    if (!selectedLecturerId || !selectedCourseId || !semester) {
      alert("All fields are required.");
      return;
    }

    try {
      await courseService.assignLecturerToCourse(selectedLecturerId, selectedCourseId, semester);
      alert("Lecturer assigned successfully!");
      setSelectedLecturerId(null);
      setSelectedCourseId(null);
      setSemester(null);
      fetchAssignedLecturers(); // refresh assignments
    } catch (error) {
      console.error("Assignment failed:", error);
      alert("Assignment failed.");
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
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h5" gutterBottom>
          Assign Lecturer to Course
        </Typography>

       <Grid container spacing={3} direction="column">
  <Grid item xs={12}>
    <FormControl fullWidth>
      <InputLabel>Lecturer</InputLabel>
      <Select
        value={selectedLecturerId ?? ""}
        label="Lecturer"
        onChange={(e) => setSelectedLecturerId(Number(e.target.value))}
      >
        {lecturers.map((lecturer) => (
          <MenuItem key={lecturer.id} value={lecturer.id}>
            {lecturer.firstName} {lecturer.lastName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </Grid>

  <Grid item xs={12}>
    <FormControl fullWidth>
      <InputLabel>Semester</InputLabel>
      <Select
        value={semester}
        label="Semester"
        onChange={(e) => setSemester(e.target.value)}
      >
        <MenuItem value="1">Semester 1</MenuItem>
        <MenuItem value="2">Semester 2</MenuItem>
      </Select>
    </FormControl>
  </Grid>
  
  <Grid item xs={12}>
    <FormControl fullWidth>
      <InputLabel>Course</InputLabel>
      <Select
        value={selectedCourseId ?? ""}
        label="Course"
        onChange={(e) => setSelectedCourseId(Number(e.target.value))}
      >
        {courses.map((course) => (
          <MenuItem key={course.id} value={course.id}>
            {course.courseName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </Grid>

  <Grid item xs={12}>
    <Button
      variant="contained"
      color="primary"
      fullWidth
      onClick={handleAssign}
    >
      Assign Lecturer
    </Button>
  </Grid>
</Grid>
      </Paper>

      <Box mt={6}>
        <Typography variant="h6" gutterBottom>
          Current Assignments
        </Typography>
        <Divider sx={{ mb: 2 }} />
        {assignments.map((a) => (
          <Paper
            key={a.id}
            elevation={1}
            sx={{ mb: 2, p: 2, borderLeft: "4px solidrgb(63, 76, 94)" }}
          >
            <Typography><strong>Lecturer:</strong> {a.lecturer.firstName} {a.lecturer.lastName}</Typography>
            <Typography><strong>Course:</strong> {a.course.courseName}</Typography>
            <Typography><strong>Semester:</strong> {a.semester}</Typography>
          </Paper>
        ))}

        {lecturers.length === 0 && (
          <Typography color="text.secondary">No lecturers found.</Typography>
        )}
        {courses.length === 0 && (
          <Typography color="text.secondary">No courses available.</Typography>
        )}
      </Box>
    </Container>
  );
};

export default AssignLecturer;
