const initialState = {
  amount: 16,
  amountX: 4,
  amountY: 4,
  cubes: {},
  initialCubes: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "CUBES_SET_AMOUNT": {
      const {
        amount: { amountX, amountY }
      } = action.payload;

      return { ...state, amountX, amountY, amount: amountX * amountY };
    }
    case "CUBES_SET_INITIAL_CUBES": {
      const { initialCubes } = action.payload;

      return { ...state, initialCubes };
    }
    case "CUBES_SET_CUBES": {
      const { cubes } = action.payload;

      return { ...state, cubes };
    }
    case "CUBES_UPDATE_CUBES": {
      const { cubes } = action.payload;
      const newCubes = { ...state.cubes };

      Object.values(cubes).forEach(cube => {
        newCubes[cube.id] = {
          ...newCubes[cube.id],
          ...cube
        };
      });

      return { ...state, cubes: newCubes };
    }
    case "CUBES_EDIT_CUBE": {
      const { cube, id } = action.payload;
      const cubes = state.cubes;

      if (!cubes[id]) return state;

      cubes[id] = { ...cubes[id], ...cube };

      return {
        ...state,
        cubes: { ...cubes }
      };
    }
    default: {
      return { ...state };
    }
  }
};
