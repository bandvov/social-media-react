import React from "react";
import { Avatar, AvatarGroup, Tooltip, Box, Typography } from "@mui/material";
import { reactionIcons } from "../constants";

const Reactions = ({ reactions, totalCount }) => {
  return (
    <Box display="flex" alignItems="center">
      <AvatarGroup max={5} sx={{ mr: 2, gap: 0.5 }}>
        {reactions?.map((reaction, index) => (
          <Tooltip
            key={index}
            title={`${reaction.count} ${reaction.reaction_type_id}`}
          >
            <Avatar
              sx={{
                width: 20, // Smaller width
                height: 20, // Smaller height
                bgcolor: "transparent",
                color: "#000", // Text color
              }}
            >
              {reactionIcons[reaction.reaction_type_id]}
            </Avatar>
          </Tooltip>
        ))}
      </AvatarGroup>
      <Typography variant="body2" color="text.primary">
        reactions: {totalCount}
      </Typography>
    </Box>
  );
};

export default Reactions;
