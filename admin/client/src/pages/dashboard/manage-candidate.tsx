import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  useToast,
} from "@chakra-ui/react";
import { userService } from "@/services/userService";
import { User } from "@/types/type";

const ManageCandidates = () => {
  const [candidates, setCandidates] = useState<User[]>([]);
  const toast = useToast();

  const fetchCandidates = async () => {
    try {
      const users = await userService.getAllUsers();
      const filtered = users.filter((u) => u.roleId === 2);
      setCandidates(filtered);
    } catch {
      toast({ title: "Failed to fetch users", status: "error" });
    }
  };

  const toggleBlock = async (userId: number, isBlocked: boolean) => {
    try {
      if (isBlocked) {
        await userService.unblockUser(userId);
        toast({ title: "Candidate unblocked", status: "success" });
      } else {
        await userService.blockUser(userId);
        toast({ title: "Candidate blocked", status: "success" });
      }
      fetchCandidates(); // Refresh list
    } catch {
      toast({ title: "Action failed", status: "error" });
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  return (
    <Box p={6}>
      <Heading mb={4}>Manage Candidates</Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Status</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {candidates.map((user) => (
            <Tr key={user.id}>
              <Td>{user.firstName} {user.lastName}</Td>
              <Td>{user.email}</Td>
              <Td>{user.isBlocked ? "Blocked" : "Active"}</Td>
              <Td>
                <Button
                  colorScheme={user.isBlocked ? "green" : "red"}
                  onClick={() => toggleBlock(Number(user.id), user.isBlocked)}
                >
                  {user.isBlocked ? "Unblock" : "Block"}
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ManageCandidates;
