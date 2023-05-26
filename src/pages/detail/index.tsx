// detail page

import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { Container, Box, Typography } from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
// override styles
import detailTheme from "./theme";
// local components
import NavBack from "../../components/NavBack";
import Media from "../../components/Media";
import { TRecordItem } from "../../components/RecordList";

const url = "https://api.spacexdata.com/v5/launches";
const Detail: FC = () => {
  const [detail, setDetail] = useState<TRecordItem>();
  const { id } = useParams();
  const getDetail = async () => {
    try {
      const data = await axios.get(`${url}/${id}`);
      setDetail(data.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getDetail();
  }, [id]);
  const youtubeId = detail?.links.youtube_id;
  return (
    <ThemeProvider theme={detailTheme}>
      <Container>
        <NavBack />
        {/* detail media */}
        {detail && youtubeId ? (
          <Media type="mp4" embedId={youtubeId} title={detail.name} />
        ) : (
          <Media
            type="image"
            url={detail?.links.patch.large}
            title={detail?.name}
          />
        )}
        {/* detail contents */}
        <Box mt={2} mb={1}>
          <Typography>
            {dayjs(detail?.date_local).format("MMMM D, YYYY")}
          </Typography>
        </Box>
        <Typography variant="h4">{detail?.name}</Typography>
        <Box
          mt={4}
          sx={(theme) => ({
            columnCount: 2,
            [theme.breakpoints.down("sm")]: {
              columnCount: 1,
            },
          })}
        >
          {detail?.details}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Detail;
