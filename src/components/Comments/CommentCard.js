import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Avatar,
  IconButton,
  CardHeader,
  Box,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const CommentCard = ({ comment }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = (event) => setAnchorEl(event.currentTarget);
  const closeMenu = () => setAnchorEl(null);

  return (
    <Card variant="outlined" sx={{ marginBottom: 2 }}>
      <CardHeader
        sx={{
          pt: 0,
          pb: 0,
        }}
        title={
          <Box
            display="grid"
            gridTemplateColumns={"auto auto 1fr"}
            alignItems="center"
            gap={2}
          >
            <Avatar src={comment.profile_pic} alt={comment.username} />
            <Typography color="text.secondary" variant="subtitle2">
              Author: {comment.username}
            </Typography>
            <Typography color="text.secondary" variant="subtitle2">
              {new Date(comment.created_at).toLocaleDateString()}
            </Typography>
          </Box>
        }
        action={
          <IconButton onClick={openMenu}>
            <MoreVertIcon />
          </IconButton>
        }
      />
      <CardContent>
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          {comment.content}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Reactions
          reactions={comment.reactions}
          totalCount={comment.total_reactions_count}
        />

        <Typography variant="body2">
          Replies: {comment.replies_count}
        </Typography>
      </CardActions>
    </Card>
  );
};

export default CommentCard;
