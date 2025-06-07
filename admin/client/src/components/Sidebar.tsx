import Link from "next/link";
import { useRouter } from "next/router";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Toolbar,
  Divider,
  Button,
} from "@mui/material";

const Sidebar = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    router.push("/");
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
  width: 250,
  flexShrink: 0,
  [`& .MuiDrawer-paper`]: {
    width: 250,
    boxSizing: "border-box",
    bgcolor: "#374151", // ✅ Admin menu background
    color: "#fff",       // Optional: white text
  },
}}
    >
      <Toolbar>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
        >
          <Typography variant="h5" noWrap>
            Admin Menu
          </Typography>
        </Box>
      </Toolbar>
      <Divider />
      <List>
        <Link href="/dashboard/manage-course" passHref legacyBehavior>
  <ListItemButton
    component="a"
    sx={{
      "&:hover": {
        bgcolor: "#4b5563", // hover effect (bg-gray-600)
      },
    }}
  >
    <ListItemText primary="Manage Courses" />
  </ListItemButton>
</Link>

        <Link href="/dashboard/assign-lecturer" passHref legacyBehavior>
  <ListItemButton
    component="a"
    sx={{
      "&:hover": {
        bgcolor: "#4b5563",
      },
    }}
  >
    <ListItemText primary="Assign Lecturer" />
  </ListItemButton>
</Link>

        <Link href="/dashboard/manage-candidate" passHref legacyBehavior>
          <ListItemButton
    component="a"
    sx={{
      "&:hover": {
        bgcolor: "#4b5563",
      },
    }}
  >
            <ListItemText primary="Block Candidate" />
          </ListItemButton>
        </Link>
        <Link href="/dashboard/reports" passHref legacyBehavior>
          <ListItemButton
    component="a"
    sx={{
      "&:hover": {
        bgcolor: "#4b5563",
      },
    }}
  >
            <ListItemText primary="Reports" />
          </ListItemButton>
        </Link>
      </List>
      <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={handleLogout}
          >
            Logout
          </Button>
    </Drawer>
  );
};

export default Sidebar;
