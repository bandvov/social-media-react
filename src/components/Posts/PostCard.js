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
      display="grid"
      gridTemplateColumns="1fr auto"
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
          <Typography color="text.secondary" variant="subtitle2">
            Author: {post.author_name}
          </Typography>
          <Typography color="text.secondary" variant="subtitle2">
            {new Date(post.created_at).toLocaleDateString()}
          </Typography>
        </Box>

        <Typography color="text.secondary" variant="body2">
          {post.content}
        </Typography>
        <Box display="grid" gridTemplateColumns="1fr auto">
          {post.reactions_count && (
            <Typography color="text.primary">
              {post.reactions_count} reactions
            </Typography>
          )}
          <Box display="grid" gap={2} gridTemplateColumns="1fr auto">
            {post.comments_count && (
              <Typography color="text.primary">
                {post.comments_count} comments
              </Typography>
            )}
            {post.share_count && (
              <Typography color="text.primary">
                {post.share_count} share:
              </Typography>
            )}
          </Box>
        </Box>
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
