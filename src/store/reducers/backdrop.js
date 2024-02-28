const initialState = {
  isBackdropActive: false,
  backdropDetails: {},
  path: "/",
};

const path = {
  NEW_ENTRY: "/entry/new",
  //EDIT_ENTRY: "/entry/edit",
  ERROR_MSG: "error",
};

function backdropReducer(state = initialState, action) {
  // reducer is function which the same state with initial value return different state on different actions
  switch (action.type) {
    case "SET_BD_STATE_ACTIVE":
      return {
        ...state,
        isBackdropActive: true,
        backdropDetails: action.data,
        path: action.data.includes("EDIT_ENTRY")
          ? `entry/edit/${action.data.slice(11)}`
          : path[action.data],
      };
    case "SET_BD_STATE_INACTIVE":
      return {
        ...state,
        isBackdropActive: false,
        backdropDetails: {},
        path: "/",
      };
    default:
      return state;
  }
}

export default backdropReducer;
