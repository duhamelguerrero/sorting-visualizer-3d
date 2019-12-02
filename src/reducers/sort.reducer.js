const initialState = {
  algorithms: ["Quicksort", "Merge", "Bubble"],
  algorithmSelected: 0,
  animator: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SORT_SET_SELECTED_ALGORITHM": {
      const { index } = action.payload;

      return { ...state, algorithmSelected: index };
    }
    case "SORT_SET_ANIMATOR": {
      const { animator } = action.payload;

      return { ...state, animator };
    }
    default: {
      return { ...state };
    }
  }
};
