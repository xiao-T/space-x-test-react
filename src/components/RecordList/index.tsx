// spaceX launch records

import React, { FC, useEffect, useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { Box, Grid } from "@mui/material";
import recordListTheme from "./theme";
import ListCard from "./ListCard";
import axios from "axios";
import dayjs from "dayjs";
// local components
import LazyLoadHOC from "../LazyLoadHOC";
import LoadMore from "../LoadMore";

let page: number = 1;
// record item type
export type TRecordItem = {
  id: string;
  name: string;
  date_local: string;
  links: {
    patch: {
      large: string;
      small: string;
    };
    youtube_id: string;
  };
  details: string;
};
const recordsUrl = "https://api.spacexdata.com/v5/launches/query";
const RecordList: FC = () => {
  const [records, setRecords] = useState<TRecordItem[]>([]);
  // fetch records
  const getRecords = async (page = 1) => {
    const options = {
      limit: 12,
      page,
      sort: {
        date_local: "asc",
      },
    };
    try {
      const res = await axios.post(recordsUrl, {
        options,
      });
      const { data } = res;
      // since React 18, useEffect will be called twice in development with `StrictMode`
      // refer to: https://react.dev/blog/2022/03/08/react-18-upgrade-guide#updates-to-strict-mode
      if (page === 1) {
        setRecords([...data.docs]);
      } else {
        setRecords((prevRecords) => [...prevRecords, ...data.docs]);
      }
      return data.hasNextPage;
    } catch (e) {
      console.log(e);
      return false;
    }
  };
  // fetch first page data
  useEffect(() => {
    getRecords(page);
  }, []);

  return (
    <ThemeProvider theme={recordListTheme}>
      <LoadMore
        onLoadMore={async () => {
          page += 1;
          const result = await getRecords(page);
          return result;
        }}
      >
        <Box mt={9} mx={2}>
          <Grid container spacing={2}>
            {records.map((record: TRecordItem) => {
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
      </LoadMore>
    </ThemeProvider>
  );
};

export default LazyLoadHOC()(RecordList);
