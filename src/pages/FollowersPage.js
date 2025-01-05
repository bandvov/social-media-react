import React from "react";
import Followers from "../components/Followers/Followers";
import { Box } from "@mui/material";
import ProfileInfo from "../components/ProfileInfo";

export default function FollowersPage() {
  return (
    <Box>
      <ProfileInfo />
      <Followers />
    </Box>
  );
}
