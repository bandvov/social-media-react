// Comments.js

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchCommentsRequest } from "../../features/comments/commentsSlice";
import CommentCard from "./CommentCard";
import { Alert, Container } from "@mui/material";

const Comments = ({ postId }) => {
  const dispatch = useDispatch();
  const { data, loading, errors, hasMore } = useSelector(
    (state) => state.comments
  );

  useEffect(() => {
    dispatch(
      fetchCommentsRequest({
        entity_id: postId,
        entity_type: "comment",
        limit: 8,
      })
    );
  }, [dispatch, postId]);

  const loadMoreComments = () => {
    dispatch(
      fetchCommentsRequest({
        entity_id: postId,
        entity_type: "comment",
        limit: 8,
      })
    );
  };

  useEffect(() => {
    console.log({ data, postId });
  }, [data]);

  if (loading.fetchComments) return "loading...";
  return (
    <Container maxWidth="md">
      {errors.fetchComments && (
        <Alert severity="error">{errors.fetchComments}</Alert>
      )}

      <InfiniteScroll
        dataLength={(data[+postId] || []).length} // This should be the length of your comments array
        next={loadMoreComments}
        hasMore={hasMore}
        loader={<div>Loading...</div>}
        endMessage={<div>No more comments</div>}
      >
        {(data[+postId] || []).map((comment) => (
          <div key={comment?.id}>
            <CommentCard comment={comment} />
            {/* Render replies if any */}
            {/* {comment.replies && comment.replies.length > 0 && (
              <div style={{ marginLeft: '20px' }}>
                {comment.replies.map((reply) => (
                  <p key={reply.id}>{reply.content}</p>
                ))}
              </div>
            )} */}
          </div>
        ))}
      </InfiniteScroll>

      {/* Add a button for adding a new comment if needed */}
    </Container>
  );
};

export default Comments;
