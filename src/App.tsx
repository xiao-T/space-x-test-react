import React from "react";

// local components
import FilterBar from "./components/FilterBar/index";
import RecordList from "./components/RecordList";

function App() {
  return (
    <div className="App">
      <FilterBar />
      <RecordList />
    </div>
  );
}

export default App;
