import { setCubes } from "./cubes.actions";

export const setAnimator = animator => ({
  type: "SORT_SET_ANIMATOR",
  payload: { animator }
});

export const setSelectedAlgorithm = index => ({
  type: "SORT_SET_SELECTED_ALGORITHM",
  payload: { index }
});

export const resetAnimator = () => (dispatch, getState) => {
  const state = getState();
  const initialCubes = state.cubes.initialCubes;
  const animator = state.sort.animator;

  if (animator) {
    animator.stop();
    dispatch(setAnimator(null));
    dispatch(setCubes(initialCubes));
  }
};
