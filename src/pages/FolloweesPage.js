import React from "react";
import Followees from "../components/Followers/Followees";
import { useParams } from "react-router-dom";

export default function FolloweesPage() {
  const { userId } = useParams();

  return <Followees userId={userId} />;
}
