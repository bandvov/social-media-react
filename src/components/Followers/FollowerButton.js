import { Button } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export default function FollowerButton({
  handler,
  followedByFollower,
  followsFollower,
}) {
  const { t } = useTranslation();
  const [hovered, setHovered] = useState(false);

  return (
    <Button
      onClick={handler}
      sx={{
        "&:hover": {
          backgroundColor:
            hovered && (followsFollower || followedByFollower) ? "pink" : "",
          color:
            hovered && (followsFollower || followedByFollower) ? "red" : "",
        },
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && followsFollower
        ? t("unfollow")
        : hovered && followedByFollower
          ? t("remove") // "remove" appears when hovered and followsFollower is true
          : followsFollower
            ? t("following")
            : followedByFollower
              ? t("isfollowing")
              : t("follow")}
    </Button>
  );
}
