// spaceX launch records

import React, { FC, useEffect, useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { Box, Grid } from "@mui/material";
import recordListTheme from "./theme";
import ListCard from "./ListCard";
import axios from "axios";
import dayjs from "dayjs";

// record item type
type TRecordItem = {
  id: string;
  name: string;
  date_local: string;
  links: {
    patch: {
      large: string;
      small: string;
    };
  };
};
const recordsUrl = "https://api.spacexdata.com/v5/launches/query";
const RecordList: FC = () => {
  const [records, setRecords] = useState<TRecordItem[]>([]);
  const getRecords = () => {
    const options = {
      limit: 12,
      page: 1,
    };
    axios
      .post(recordsUrl, {
        options,
      })
      .then((res) => {
        const { data } = res;
        const newRecords = records.concat(data.docs);
        setRecords(newRecords);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  useEffect(() => {
    getRecords();
  }, []);
  console.log(records);
  return (
    <ThemeProvider theme={recordListTheme}>
      <Box mt={9} mx={2}>
        <Grid container spacing={2}>
          {records.map((record: TRecordItem, index) => {
            const { id, name, links, date_local } = record;
            const image = links.patch.small;
            const time = dayjs(date_local).format("MMMM D, YYYY");
            return (
              <Grid key={id} item>
                <ListCard id={id} name={name} image={image} time={time} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default RecordList;
