// home page

import React, { FC, useReducer } from "react";
import FilterBar from "../../components/FilterBar";
import RecordList from "../../components/RecordList";
import homeReducer, { HomeContext, homeInitState } from "./store";

const Home: FC = () => {
  const [state, dispatch] = useReducer(homeReducer, homeInitState);
  return (
    <HomeContext.Provider value={{ ...state, dispatch }}>
      <FilterBar />
      <RecordList />
    </HomeContext.Provider>
  );
};

export default Home;
