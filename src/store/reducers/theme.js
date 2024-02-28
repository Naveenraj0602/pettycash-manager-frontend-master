const initialState = {
    mode: 'light'
  };
  
  
  function themeReducer(state = initialState, action) {
    // reducer is function which the same state with initial value return different state on different actions
    switch (action.type) {
      case 'TOGGLE':
        return {
          ...state,
          mode: state.mode === "light" ? "dark" : "light"
        }
      default:
        return state;
    }
  }
  
  export default themeReducer;