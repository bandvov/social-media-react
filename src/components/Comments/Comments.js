// Comments.js

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchCommentsRequest } from "../../features/comments/commentsSlice";

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
    <div>
      {errors.fetchComments && <div>Error: {errors.fetchComments}</div>}

      <InfiniteScroll
        dataLength={(data[+postId] || []).length} // This should be the length of your comments array
        next={loadMoreComments}
        hasMore={hasMore}
        loader={<div>Loading...</div>}
        endMessage={<div>No more comments</div>}
      >
        {(data[+postId] || []).map((comment) => (
          <div key={comment?.id}>
            <p>{comment?.content}</p>
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
    </div>
  );
};

export default Comments;
