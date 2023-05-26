// home page

import React, { FC } from "react";
import FilterBar from "../../components/FilterBar";
import RecordList from "../../components/RecordList";
const Home: FC = () => {
  return (
    <>
      <FilterBar />
      <RecordList />
    </>
  );
};

export default Home;
