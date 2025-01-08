import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";

export default function FollowerCard({ user, action, key }) {
  return (
    <Paper key={key}>
      <Card
        variant="outlined"
        sx={{
          mb: 2,
          borderColor: "border.main",
        }}
      >
        <CardHeader
          avatar={
            <Avatar
              sx={{
                border: "2px solid white",
              }}
              src={user?.profile_pic}
              aria-label="recipe"
            >
              {user?.username}
            </Avatar>
          }
          title={
            <>
              <Typography variant="h6">{user?.username}</Typography>
              <Typography variant="body2">{user?.email}</Typography>
            </>
          }
          action={action}
        />
        <CardContent
          sx={{
            py: 0,
          }}
        >
          <Typography variant="body2">{user?.bio}</Typography>
        </CardContent>
      </Card>
    </Paper>
  );
}
