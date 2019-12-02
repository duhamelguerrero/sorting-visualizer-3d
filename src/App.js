import React, { useEffect, useCallback } from "react";
import Header from "./components/Header";
import Scene from "./components/Scene";

import { useDispatch } from "react-redux";
import { generateCubes, sortCubes } from "./actions/cubes.actions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(generateCubes(30));
  }, []);

  return (
    <div className="App">
      <Header />
      <Scene />
    </div>
  );
}

export default App;
