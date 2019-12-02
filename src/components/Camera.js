import React, { useRef, useEffect, useState } from "react";
import { useFrame, useThree } from "react-three-fiber";
import { useSelector } from "react-redux";

const Camera = props => {
  const ref = useRef();
  const amount = useSelector(state => state.cubes.amount);

  const { setDefaultCamera, scene } = useThree();
  // Make the camera known to the system
  useEffect(() => setDefaultCamera(ref.current), []);
  // Update it every frame
  useFrame(() => ref.current.updateMatrixWorld());

  useEffect(() => {
    //ref.current.scale.x = 0.002 * amount;
    //ref.current.scale.y = 0.002 * amount;

    ref.current.position.set(50, 50, 50); // all components equal
    ref.current.lookAt(scene.position); // or the origin
  }, []);

  return <perspectiveCamera ref={ref} {...props} />;
};

export default Camera;
