import { useEffect, useState } from "react";
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Text,
    useToast,
} from "@chakra-ui/react";
import { courseService } from "@/services/courseService";
import { Course } from "@/types/type";

const ManageCourses = () => {
    const toast = useToast();
    const [courses, setCourses] = useState<Course[]>([]);
    const [courseName, setCourseName] = useState("");
    const [courseCode, setCourseCode] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);

    const fetchCourses = async () => {
        try {
            const result = await courseService.getCourses();
            setCourses(result);
        } catch {
            toast({ title: "Failed to load courses.", status: "error" });
        }
    };

    const handleSubmit = async () => {
        if (!courseName || !courseCode) {
            toast({ title: "All fields are required.", status: "warning" });
            return;
        }

        try {
            if (editingId !== null) {
                console.log("id", editingId);
                console.log("Updating with:", {
                    id: editingId,
                    courseName,
                    courseCode,
                });

                await courseService.updateCourse(editingId, courseName, courseCode);
                toast({ title: "Course updated.", status: "success" });
                setEditingId(null);
            } else {
                await courseService.addCourse(courseName, courseCode);
                toast({ title: "Course added.", status: "success" });
            }

            setCourseName("");
            setCourseCode("");
            await fetchCourses();
        } catch {
            toast({ title: "Operation failed.", status: "error" });
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await courseService.deleteCourse(id);
            toast({ title: "Course deleted.", status: "info" });
            await fetchCourses();
        } catch {
            toast({ title: "Delete failed.", status: "error" });
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
        <Box p={6} maxW="600px" mx="auto">
            <Heading mb={4}>Manage Courses</Heading>

            <Stack spacing={4} mb={6}>
                <FormControl>
                    <FormLabel>Course Name</FormLabel>
                    <Input value={courseName} onChange={(e) => setCourseName(e.target.value)} />
                </FormControl>
                <FormControl>
                    <FormLabel>Course Code</FormLabel>
                    <Input value={courseCode} onChange={(e) => setCourseCode(e.target.value)} />
                </FormControl>
                <Button onClick={handleSubmit} colorScheme="blue">
                    {editingId ? "Update Course" : "Add Course"}
                </Button>
            </Stack>

            <Heading size="md" mb={2}>Courses</Heading>
            {courses.length > 0 ? (
                courses.map((course) => (
                    <Flex key={course.id} justify="space-between" align="center" p={3} borderWidth="1px" borderRadius="md" mb={2}>
                        <Box>
                            <Text><strong>{course.courseName}</strong> ({course.courseCode})</Text>
                        </Box>
                        <Stack direction="row">
                            <Button size="sm" onClick={() => handleEdit(course)}>Edit</Button>
                            <Button size="sm" colorScheme="red" onClick={() => handleDelete(course.id)}>Delete</Button>
                        </Stack>
                    </Flex>
                ))
            ) : (
                <Text>No courses found.</Text>
            )}
        </Box>
    );
};

export default ManageCourses;
