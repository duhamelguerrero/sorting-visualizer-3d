const initialState = {
  amount: 30,
  cubes: {},
  initialCubes: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "CUBES_SET_AMOUNT": {
      const { amount } = action.payload;

      return { ...state, amount };
    }
    case "CUBES_SET_INITIAL_CUBES": {
      const { initialCubes } = action.payload;

      return { ...state, initialCubes };
    }
    case "CUBES_SET_CUBES": {
      const { cubes } = action.payload;

      return { ...state, cubes };
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
