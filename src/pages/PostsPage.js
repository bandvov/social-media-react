import React from "react";
import UserPosts from "../components/Posts/UserPosts";
import { Box } from "@mui/material";
import ProfileInfo from "../components/ProfileInfo";

export default function PostsPage() {
  return (
    <Box>
      <ProfileInfo />
      <UserPosts />;
    </Box>
  );
}
