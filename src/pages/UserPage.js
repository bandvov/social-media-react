import { Box } from "@mui/material";
import React from "react";
import { Outlet, useParams } from "react-router-dom";
import ProfileInfo from "../components/ProfileInfo";

export default function UserPage() {
  const { userId } = useParams();

  return (
    <Box>
      <ProfileInfo userId={userId} />
      <Outlet />
    </Box>
  );
}
