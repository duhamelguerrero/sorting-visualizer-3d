import { setAnimator } from "./sort.actions";
import { getRandomCubes } from "../utils/cubes";
import { quickSort } from "../utils/sort";
import { Animator } from "../utils/animator";

export const setCubes = cubes => ({
  type: "CUBES_SET_CUBES",
  payload: { cubes }
});

export const editCube = (id, cube) => ({
  type: "CUBES_EDIT_CUBE",
  payload: { id, cube }
});

export const setAmountCubes = amount => dispatch => {
  dispatch({
    type: "CUBES_SET_AMOUNT",
    payload: { amount }
  });

  dispatch(generateCubes(amount));
};

export const generateCubes = amount => (dispatch, getState) => {
  const state = getState();
  const animator = state.sort.animator;

  if (animator) {
    animator.stop();
    dispatch(setAnimator(null));
  }

  const cubes = getRandomCubes(amount);

  dispatch({
    type: "CUBES_SET_INITIAL_CUBES",
    payload: {
      initialCubes: { ...cubes }
    }
  });
  dispatch(setCubes(cubes));
};

export const sortCubes = () => (dispatch, getState) => {
  const state = getState();
  const cubes = Object.values(state.cubes.cubes);

  let [result, animation] = quickSort(cubes, dispatch);

  const animator = new Animator(animation);
  animator.play();

  dispatch(setAnimator(animator));
};
