import React from "react";
import { Avatar, AvatarGroup, Tooltip, Box, Typography } from "@mui/material";

// Reaction Icons (can be replaced with custom icons)
const reactionIcons = {
  Like: "👍",
  Dislike: "👎",
  Love: "❤️",
  Angry: "😡",
  Wow: "😮",
};

const Reactions = ({ reactions }) => {
  const total_count = 2;

  return (
    <Box display="flex" alignItems="center">
      <AvatarGroup max={5} sx={{ mr: 2, gap: 0.5 }}>
        {reactions?.map((reaction, index) => (
          <Tooltip
            key={index}
            title={`${reaction.count} ${reaction.reaction_type}`}
          >
            <Avatar
              sx={{
                width: 20, // Smaller width
                height: 20, // Smaller height
                bgcolor: "transparent",
                color: "#000", // Text color
              }}
            >
              {reactionIcons[reaction.reaction_type]}
            </Avatar>
          </Tooltip>
        ))}
      </AvatarGroup>
      <Typography variant="body2" color="text.primary">
        reactions: {total_count}
      </Typography>
    </Box>
  );
};

export default Reactions;
