import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Paper
} from "@mui/material";
import { userService } from "@/services/userService";
import { User } from "@/types/type";

const ManageCandidates = () => {
  const [candidates, setCandidates] = useState<User[]>([]);

  const fetchCandidates = async () => {
    try {
      const users = await userService.getAllUsers();
      const filtered = users.filter((u) => u.role === "candidate"); // candidates
      setCandidates(filtered);
    } catch {
      alert("Failed to fetch users");
    }
  };

  const toggleBlock = async (userId: number, isBlocked: boolean) => {
    try {
      if (isBlocked) {
        await userService.unblockUser(userId);
        alert("Candidate unblocked");
      } else {
        await userService.blockUser(userId);
        alert("Candidate blocked");
      }
      fetchCandidates();
    } catch {
      alert("Action failed");
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h5" gutterBottom>
          Manage Candidates
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Action</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {candidates.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.firstName} {user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.isBlocked ? "Blocked" : "Active"}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color={user.isBlocked ? "success" : "error"}
                    onClick={() => toggleBlock(Number(user.id), user.isBlocked)}
                  >
                    {user.isBlocked ? "Unblock" : "Block"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default ManageCandidates;
