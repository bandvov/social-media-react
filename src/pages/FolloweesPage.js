import React from "react";
import Followees from "../components/Followers/Followees";
import { Box } from "@mui/material";
import ProfileInfo from "../components/ProfileInfo";
import { useParams } from "react-router-dom";

export default function FolloweesPage() {
  const { userId } = useParams();

  return (
    <Box>
      <ProfileInfo userId={userId} />
      <Followees userId={userId} />;
    </Box>
  );
}
