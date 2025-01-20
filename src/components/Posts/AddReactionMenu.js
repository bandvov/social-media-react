import React, { useState } from "react";
import { Menu, MenuItem, Button, Typography } from "@mui/material";
import { reactionIcons } from "../../constants";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import {
  addReactionRequest,
  removeReactionRequest,
} from "../../features/posts/postsSlice";

const AddReactionMenu = ({ entity_id, userReaction }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedReaction, setSelectedReaction] = useState(userReaction); // Track the selected reaction

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleReactionClick = (reaction) => {
    setSelectedReaction(reaction); // Set the selected reaction
    if (reaction === selectedReaction) {
      dispatch(removeReactionRequest({ entity_id }));
    } else {
      dispatch(addReactionRequest({ entity_id, reaction }));
    }
    handleCloseMenu();
  };

  return (
    <div>
      {/* Update button to show selected reaction */}
      <Button
        color="primary"
        onClick={handleOpenMenu}
        startIcon={reactionIcons[selectedReaction]}
      >
        {selectedReaction ? t(selectedReaction) : t("addReaction")}
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {Object.entries(reactionIcons).map(([name, icon]) => (
          <MenuItem
            key={name}
            onClick={() => handleReactionClick(name)}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontSize: "1.2rem",
            }}
          >
            <span>{icon}</span>
            <Typography
              variant="body1"
              color={selectedReaction == name && "primary.main"}
            >
              {name}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default AddReactionMenu;
