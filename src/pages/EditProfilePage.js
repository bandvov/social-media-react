import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "@mui/material";
import ProfileForm from "../components/profileForm";
import { fetchUserProfileRequest } from "../features/user/userSlice";
import ProfileInfo from "../components/ProfileInfo";

const EditProfilePage = ({ userId }) => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.user);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserProfileRequest(userId));
    }
  }, [dispatch, userId]);

  return (
    <Container maxWidth="md">
      {profile && <ProfileInfo />}
      <ProfileForm />
    </Container>
  );
};

export default EditProfilePage;
