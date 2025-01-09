import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "@mui/material";
import ProfileForm from "../components/profileForm";
import {
  fetchUserProfileRequest,
  updateUserRequest,
} from "../features/user/userSlice";
import { useParams } from "react-router-dom";

const EditProfilePage = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserProfileRequest(userId));
    }
  }, [dispatch, userId]);

  const handleSubmit = (values) => {
    dispatch(updateUserRequest({ userId: profile.id, data: values }));
  };
  return (
    <Container maxWidth="md">
      <ProfileForm
        profile={profile}
        loading={loading}
        error={error}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
};

export default EditProfilePage;
