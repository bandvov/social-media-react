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
import { useDispatch } from "react-redux";
import { removePostsRequest } from "../../features/posts/postsSlice";
import { useTranslation } from "react-i18next";

export default function BasicCard({ post }) {
  const { t } = useTranslation();
  const [menuAnchor, setMenuAnchor] = React.useState(null);
  const dispatch = useDispatch();

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };
  const handleRemovePost = () => {
    handleMenuClose();
    dispatch(removePostsRequest(post.id));
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
          py: 0,
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
        <Button>{t("addReaction")}</Button>
        <Button>{t("addComment")}</Button>
        <Button>{t("repost")}</Button>
      </CardActions>
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleRemovePost}>{t("removePost")}</MenuItem>
      </Menu>
    </Card>
  );
}
