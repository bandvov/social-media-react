import { Button } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export default function FollowerButton({ handler, isFollowedBy }) {
  const { t } = useTranslation();
  const [hovered, setHovered] = useState(false);

  return (
    <Button
      onClick={handler}
      sx={{
        "&:hover": {
          backgroundColor: hovered && isFollowedBy ? "pink" : "",
          color: hovered && isFollowedBy ? "red" : "",
        },
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && isFollowedBy
        ? t("unfollow")
        : isFollowedBy
          ? t("following")
          : t("follow")}
    </Button>
  );
}
