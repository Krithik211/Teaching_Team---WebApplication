import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import { useRouter } from "next/router";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const router = useRouter();

 useEffect(() => {
  if (typeof window !== "undefined") {
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";
    setShowSidebar(isLoggedIn);
  }
}, [router.pathname]);
  return (
    <Box display="flex" minHeight="100vh">
      {showSidebar && <Sidebar />}
      <Box flexGrow={1} p={3}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
