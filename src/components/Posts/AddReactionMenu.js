import React, { useState } from "react";
import { Menu, MenuItem, Button, Typography, Box } from "@mui/material";
import { reactionIcons } from "../../constants";
import { useTranslation } from "react-i18next";

const AddReactionMenu = () => {
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedReaction, setSelectedReaction] = useState("");

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleReactionClick = (reaction) => {
    setSelectedReaction(reaction);
    handleCloseMenu();
  };

  return (
    <div>
      <Button color="primary" onClick={handleOpenMenu}>
        {t("addReaction")}
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
            <Typography variant="body1">{name}</Typography>
          </MenuItem>
        ))}
      </Menu>

      {selectedReaction && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1">
            You selected: <strong>{selectedReaction}</strong>
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default AddReactionMenu;
