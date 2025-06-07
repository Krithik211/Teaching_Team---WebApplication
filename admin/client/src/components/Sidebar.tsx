import { Box, VStack, Link as ChakraLink, Heading } from "@chakra-ui/react";
import Link from "next/link";

const Sidebar = () => {
  return (
    <Box w="250px" h="100vh" bg="gray.200" p={6} boxShadow="md">
      <Heading size="md" mb={6}>Admin Menu</Heading>
      <VStack spacing={4} align="stretch">
        <Link href="/dashboard/manage-courses" passHref>
          <ChakraLink>Manage Courses</ChakraLink>
        </Link>
        <Link href="/dashboard/assign-lecturer" passHref>
          <ChakraLink>Assign Lecturer</ChakraLink>
        </Link>
        <Link href="/dashboard/manage-candidate" passHref>
          <ChakraLink>Block Candidate</ChakraLink>
        </Link>
        <Link href="/dashboard/reports" passHref>
          <ChakraLink>Reports</ChakraLink>
        </Link>
      </VStack>

<Box>
</Box>

    </Box>
  );
};

export default Sidebar;
