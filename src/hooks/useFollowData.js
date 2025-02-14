import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchFolloweesRequest,
  fetchFollowersRequest,
  setInitialFolloweesState,
  setInitialFollowersState,
} from "../../features/followees/followeesSlice"; // Import the respective actions

const useFollowData = (type, userId) => {
  const dispatch = useDispatch();
  const { data, loading, hasMore } = useSelector((state) =>
    type === "followees" ? state.followees : state.followers
  );

  useEffect(() => {
    if (data?.length === 0 && profileId) {
      if (type === "followees") {
        dispatch(setInitialFolloweesState());
        dispatch(fetchFolloweesRequest({ userId, limit: 4 }));
      } else {
        dispatch(setInitialFollowersState());
        dispatch(fetchFollowersRequest({ userId, limit: 4 }));
      }
    }
  }, [dispatch, data?.length, userId, type]);

  const fetchMore = () => {
    if (!loading && hasMore) {
      if (type === "followees") {
        dispatch(fetchFolloweesRequest({ userId, limit: 4 }));
      } else {
        dispatch(fetchFollowersRequest({ userId, limit: 4 }));
      }
    }
  };

  return { data, loading, hasMore, fetchMore };
};

export default useFollowData;
