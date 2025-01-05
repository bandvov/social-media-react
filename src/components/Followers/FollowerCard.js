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

export default function FollowerCard({ user, action }) {
  return (
    <Paper>
      <Card
        key={user.id}
        variant="outlined"
        sx={{
          mb: 2,
          borderColor: "border.main",
        }}
      >
        <CardHeader
          avatar={
            <Avatar src={user.profile_pic} aria-label="recipe">
              {user.username}
            </Avatar>
          }
          title={
            <>
              <Typography variant="h6">{user.username}</Typography>
              <Typography variant="body2">{user.email}</Typography>
            </>
          }
          action={action}
        />
        <CardContent
          sx={{
            py: 0,
          }}
        >
          <Typography variant="body2">{user.bio}</Typography>
        </CardContent>
      </Card>
    </Paper>
  );
}
