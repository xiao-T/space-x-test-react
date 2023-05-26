// detail page

import { Box } from "@mui/material";
import React, { FC, useEffect } from "react";
import { useParams } from "react-router-dom";

const Detail: FC = () => {
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    console.log("detail init");
  }, []);
  return <Box style={{ color: "#fff" }}>detail--{id}</Box>;
};

export default Detail;
