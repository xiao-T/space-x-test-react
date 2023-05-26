// detail page

import { ThemeProvider } from "@emotion/react";
import { Container } from "@mui/material";
import axios from "axios";
import React, { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
// override styles
import detailTheme from "./theme";
// local components
import NavBack from "../../components/NavBack";

const url = "https://api.spacexdata.com/v5/launches";
const Detail: FC = () => {
  const { id } = useParams();
  const getDetail = async () => {
    try {
      const detail = await axios.get(`${url}/${id}`);
      console.log(detail);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getDetail();
  }, [id]);
  return (
    <ThemeProvider theme={detailTheme}>
      <Container>
        <NavBack />
      </Container>
    </ThemeProvider>
  );
};

export default Detail;
