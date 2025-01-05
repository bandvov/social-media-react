import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";

export default function FollowerCard({ follower }) {
  return (
    <Paper>
      <Card
        key={follower.id}
        variant="outlined"
        sx={{
          mb: 2,
          borderColor: "border.main",
        }}
      >
        <CardHeader
          avatar={
            <Avatar src={follower.profile_pic} aria-label="recipe">
              {follower.username}
            </Avatar>
          }
          title={
            <>
              <Typography variant="h6">{follower.username}</Typography>
              <Typography variant="body2">{follower.email}</Typography>
            </>
          }
          action={<Button variant="outlined">Follow</Button>}
        />
        <CardContent
          sx={{
            py: 0,
          }}
        >
          <Typography variant="body2">{follower.bio}</Typography>
        </CardContent>
      </Card>
    </Paper>
  );
}
