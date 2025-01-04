import React from "react";
import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function PostCard({ post }) {
  const [menuAnchor, setMenuAnchor] = React.useState(null);

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr auto",
      }}
      key={post.id}
      border={1}
      borderRadius={1}
      p={2}
      mb={2}
    >
      <Box>
        <Box
          display="grid"
          gridTemplateColumns={"auto 1fr"}
          alignItems="center"
          gap={2}
        >
          <Typography variant="subtitle2">
            Author: {post.author_name}
          </Typography>
          <Typography variant="subtitle2">
            {new Date(post.created_at).toLocaleDateString()}
          </Typography>
        </Box>

        <Typography variant="body2">{post.content}</Typography>
      </Box>
      {/* Action Menu */}
      <IconButton onClick={handleMenuOpen}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Remove</MenuItem>
      </Menu>
    </Box>
  );
}
