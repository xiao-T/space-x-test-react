// nav back component
import React, { FC } from "react";
import { ArrowBackIos } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NavBack: FC = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <Box py={1}>
      <Button onClick={handleBack} color="inherit">
        <ArrowBackIos fontSize="inherit" htmlColor="#fff" />
        <span>Back To Launches</span>
      </Button>
    </Box>
  );
};

export default NavBack;
