import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useUserData = ({ type, userId, actions }) => {
  const dispatch = useDispatch();
  const { data, loading, hasMore } = useSelector((state) => state[type]);

  useEffect(() => {
    if (data?.length === 0 && userId) {
      dispatch(actions.setInitialState());
      dispatch(actions.fetchRequest());
    }
  }, [dispatch, data?.length, userId]);

  const fetchMore = () => {
    if (!loading && hasMore) {
      dispatch(actions.fetchRequest());
    }
  };

  return { data, loading, hasMore, fetchMore };
};

export default useUserData;
