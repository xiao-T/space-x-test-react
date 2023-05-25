/**
 * Filter Bar
 */
import React, { FC, useState } from "react";
import AppBar from "@mui/material/AppBar";
import { Toolbar, Typography, IconButton } from "@mui/material";
import { Search } from "@mui/icons-material";

import FilterPanel from "./filter";

const FilterBar: FC = () => {
  const [showFilter, setShowFilter] = useState<boolean>(false);
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            SpaceX
          </Typography>
          <IconButton onClick={() => setShowFilter(!showFilter)}>
            <Search htmlColor="#fff" />
          </IconButton>
        </Toolbar>
      </AppBar>
      <FilterPanel open={showFilter} onClose={() => setShowFilter(false)} />
    </>
  );
};

export default FilterBar;
