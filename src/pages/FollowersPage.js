import React from "react";
import Followers from "../components/Followers/Followers";
import { Box } from "@mui/material";
import ProfileInfo from "../components/ProfileInfo";
import { useParams } from "react-router-dom";

export default function FollowersPage() {
  const { userId } = useParams();

  return (
    <Box>
      <ProfileInfo userId={userId} />
      <Followers userId={userId} />
    </Box>
  );
}
