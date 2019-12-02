import React, { useEffect, useState } from "react";
import { Provider, connect, ReactReduxContext } from "react-redux";
import { Canvas, useFrame, useThree } from "react-three-fiber";

import * as THREE from "three";

import MeshCube from "./MeshCube";
import Camera from "./Camera";
import Controls from "./Controls";

const Scene = ({ amount, cubes, initialCubes }) => {
  return (
    <ReactReduxContext.Consumer>
      {({ store }) => {
        return (
          <Canvas style={{ width: "100vw", height: "calc(100vh - 64px)" }}>
            <Provider store={store}>
              <ambientLight intensity={0.5} />
              <Camera>
                <spotLight
                  intensity={0.5}
                  position={[0, 0, 0]}
                  angle={0.8}
                  penumbra={1}
                  castShadow
                />
              </Camera>
              <Controls enableDamping rotateSpeed={0.3} dampingFactor={0.1} />
              {Object.values(initialCubes).map((cube, index) => {
                if (!cubes[cube.id]) return "";

                return <MeshCube key={index + cube.id} cubeId={cube.id} />;
              })}
            </Provider>
          </Canvas>
        );
      }}
    </ReactReduxContext.Consumer>
  );
};

const mapStateToProps = state => ({
  amount: state.cubes.amount,
  cubes: state.cubes.cubes,
  initialCubes: state.cubes.initialCubes
});

export default connect(mapStateToProps)(Scene);
