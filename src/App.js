import React, { useEffect, useCallback } from "react";
import Header from "./components/Header";
import Scene from "./components/Scene";

import { useDispatch, useSelector } from "react-redux";
import { generateCubes } from "./actions/cubes.actions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(generateCubes());
  }, []);

  return (
    <div className="App">
      <Header />
      <Scene />
    </div>
  );
}

export default App;
