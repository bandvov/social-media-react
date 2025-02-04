import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removePostRequest } from "../../features/posts/postsSlice";
import { useTranslation } from "react-i18next";
import Reactions from "../Reactions";
import DOMPurify from "dompurify";
import AddReactionMenu from "./AddReactionMenu";
import AddCommentModal from "./AddCommentModal";

export default function BasicCard({ post }) {
  const { t } = useTranslation();
  const [menuAnchor, setMenuAnchor] = React.useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const sanitizedContent = DOMPurify.sanitize(post?.content);

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };
  const handleRemovePost = () => {
    handleMenuClose();
    dispatch(removePostRequest(post.id));
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
              Author: {post?.author_name}
            </Typography>
            <Typography color="text.secondary" variant="subtitle2">
              {new Date(post?.created_at).toLocaleDateString()}
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
        <Typography
          dangerouslySetInnerHTML={{
            __html: sanitizedContent,
          }}
          color="text.secondary"
          variant="body2"
        ></Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          p: 2,
        }}
      >
        <Reactions
          reactions={post?.reactions}
          totalCount={post?.total_reactions_count}
        />
        <Box
          display="grid"
          gap={2}
          gridTemplateColumns="1fr auto"
          alignSelf="end"
        >
          {post?.total_comments_count && (
            <Typography variant="body2" color="text.primary">
              {post?.total_comments_count} comments
            </Typography>
          )}
          {post?.share_count && (
            <Typography variant="body2" color="text.primary">
              {post?.share_count} shares
            </Typography>
          )}
        </Box>
      </CardActions>
      <Divider />
      <CardActions>
        <AddReactionMenu userReaction={post?.user_reaction} entity_id={post?.id} />
        <AddCommentModal entity_id={post?.id} author_id={user?.id} entity_type="comment" />
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
