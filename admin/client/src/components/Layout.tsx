import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Flex>
      <Sidebar />
      <Box flex="1" p={6} bg="gray.50">
        {children}
      </Box>
    </Flex>
  );
};

export default Layout;
