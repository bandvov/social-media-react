import React from "react";
import Followers from "../components/Followers/Followers";
import { useParams } from "react-router-dom";

export default function FollowersPage() {
  const { userId } = useParams();

  return <Followers userId={userId} />;
}
