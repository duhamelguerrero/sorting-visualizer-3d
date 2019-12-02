import { resetAnimator, setAnimator } from "./sort.actions";
import { getRandomCubes } from "../utils/cubes";
import { quickSort, bubbleSort } from "../utils/sort";
import { Animator } from "../utils/animator";

export const setCubes = cubes => ({
  type: "CUBES_SET_CUBES",
  payload: { cubes }
});
export const updateCubes = cubes => ({
  type: "CUBES_UPDATE_CUBES",
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
  dispatch(resetAnimator());

  if (!amount) {
    amount = state.cubes.amount;
  } else {
    amount = amount.amountX * amount.amountY;
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
  const algorithm = state.sort.algorithms[state.sort.algorithmSelected];
  const cubes = Object.values(state.cubes.cubes);

  let sortF = quickSort;

  if (algorithm === "Quicksort") {
    sortF = quickSort;
  } else if (algorithm === "Bubble") {
    sortF = bubbleSort;
  }

  let [result, animation] = sortF(cubes, dispatch);

  const animator = new Animator(animation);
  animator.play();

  dispatch(setAnimator(animator));
};
