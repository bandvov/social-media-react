import React from "react";
import Followees from "../components/Followers/Followees";
import { Box } from "@mui/material";
import ProfileInfo from "../components/ProfileInfo";

export default function FolloweesPage() {
  return (
    <Box>
      <ProfileInfo />
      <Followees />;
    </Box>
  );
}
