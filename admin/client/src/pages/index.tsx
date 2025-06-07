// pages/index.tsx
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper
} from "@mui/material";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    localStorage.setItem("isAdminLoggedIn", "true");
    if (email === 'admin' && password === 'admin') {
      router.push('/dashboard/manage-course');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 12 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Admin Login
        </Typography>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleLogin}
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
