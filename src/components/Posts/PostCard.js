import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React from "react";

export default function BasicCard({ post }) {
  const [menuAnchor, setMenuAnchor] = React.useState(null);

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };
  return (
    <Card
      variant="outlined"
      sx={{
        mb: 2,
        borderColor: "border.main",
      }}
    >
      <CardHeader
        sx={{
          pt: 0,
          pb: 0,
        }}
        title={
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
        }
        action={
          <IconButton onClick={handleMenuOpen}>
            <MoreVertIcon />
          </IconButton>
        }
      />

      <CardContent
        sx={{
          pt: 0,
          pb: 0,
        }}
      >
        <Typography color="text.secondary" variant="body2">
          {post.content}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          p: 2,
        }}
      >
        <Typography variant="body2" color="text.primary">
          {post.reactions_count} reactions
        </Typography>

        <Box
          display="grid"
          gap={2}
          gridTemplateColumns="1fr auto"
          alignSelf="end"
        >
          {post.comments_count && (
            <Typography variant="body2" color="text.primary">
              {post.comments_count} comments
            </Typography>
          )}
          {post.share_count && (
            <Typography variant="body2" color="text.primary">
              {post.share_count} shares
            </Typography>
          )}
        </Box>
      </CardActions>
      <CardActions>
        <Button>Add reaction</Button>
        <Button>Comment</Button>
        <Button>Repost</Button>
      </CardActions>
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Remove</MenuItem>
      </Menu>
    </Card>
  );
}
