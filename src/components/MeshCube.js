import React, { useRef, useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { Canvas, useFrame, useThree } from "react-three-fiber";
import * as THREE from "three";
import { useSpring, animated } from "react-spring/three";

const MeshCube = ({ cubeId, cubes, amount, amountX, amountY }) => {
  const cube = cubes[cubeId];

  const cubeExist = cube && Object.values(cube).length;

  const cubePosition = cubeExist
    ? [
        cube.position.x +
          (Math.floor(cube.order / amountY) * 1.8 - (amountX / 2) * 1.8),
        cube.position.y - 150 / 40,
        cube.position.z + ((cube.order % amountY) * 1.8 - (amountY / 2) * 1.8)
      ]
    : [0, 0, 0];

  const { color, pos, geometry } = useSpring({
    color: cubeExist ? cube.color : "green",
    pos: cubeExist ? cubePosition : [0, 0, 0],
    geometry: cubeExist ? [1, cube.height / 20, 1] : [1, 2, 1]
  });

  return (
    <animated.mesh position={pos}>
      <animated.boxBufferGeometry attach="geometry" args={geometry} />
      <animated.meshLambertMaterial attach="material" color={color} />
    </animated.mesh>
  );
};

const mapStateToProps = state => ({
  cubes: state.cubes.cubes,
  amount: state.cubes.amount,
  amountX: state.cubes.amountX,
  amountY: state.cubes.amountY
});

export default connect(mapStateToProps)(MeshCube);
