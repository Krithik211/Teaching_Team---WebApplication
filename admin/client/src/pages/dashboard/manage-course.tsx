import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Stack,
  Paper,
  Divider,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  FormControl,
} from "@mui/material";
import { courseService } from "@/services/courseService";
import { Course } from "@/types/type";

const ManageCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [semester, setSemester] = useState("S1");


  const fetchCourses = async () => {
    try {
      const result = await courseService.getCourses();
      setCourses(result);
    } catch {
      alert("Failed to load courses.");
    }
  };

  const handleSubmit = async () => {
    if (!courseName || !courseCode) {
      alert("All fields are required.");
      return;
    }

    try {
      if (editingId !== null) {
        await courseService.updateCourse(editingId, courseName, courseCode);
        alert("Course updated.");
        setEditingId(null);
      } else {
        await courseService.addCourse(courseName, courseCode);
        alert("Course added.");
      }

      setCourseName("");
      setCourseCode("");
      await fetchCourses();
    } catch {
      alert("Operation failed.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await courseService.deleteCourse(id);
      alert("Course deleted.");
      await fetchCourses();
    } catch {
      alert("Delete failed.");
    }
  };

  const handleEdit = (course: Course) => {
    setEditingId(course.id);
    setCourseName(course.courseName);
    setCourseCode(course.courseCode);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h5" gutterBottom>
          Manage Courses
        </Typography>
        <Stack spacing={3} mb={4}>
  <FormControl>
    <RadioGroup
      row
      value={semester}
      onChange={(e) => setSemester(e.target.value)}
    >
      <FormControlLabel value="S1" control={<Radio />} label="Semester 1" />
      <FormControlLabel value="S2" control={<Radio />} label="Semester 2" />
    </RadioGroup>
  </FormControl>

  <TextField
    label="Course Name"
    value={courseName}
    fullWidth
    onChange={(e) => setCourseName(e.target.value)}
  />
  <TextField
    label="Course Code"
    value={courseCode}
    fullWidth
    onChange={(e) => setCourseCode(e.target.value)}
  />
  <Button
    variant="contained"
    color="primary"
    onClick={handleSubmit}
    fullWidth
  >
    {editingId ? "Update Course" : "Add Course"}
  </Button>
</Stack>

      </Paper>

      <Box mt={5}>
        <Typography variant="h6" gutterBottom>
          Courses
        </Typography>
        <Divider sx={{ mb: 2 }} />
        {courses.length > 0 ? (
          courses.map((course) => (
            <Paper
              key={course.id}
              elevation={1}
              sx={{
                p: 2,
                mb: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography fontWeight="bold">
                  {course.courseName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {course.courseCode}
                </Typography>
              </Box>
              <Stack direction="row" spacing={1}>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => handleEdit(course)}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  onClick={() => handleDelete(course.id)}
                >
                  Delete
                </Button>
              </Stack>
            </Paper>
          ))
        ) : (
          <Typography>No courses found.</Typography>
        )}
      </Box>
    </Container>
  );
};

export default ManageCourses;
