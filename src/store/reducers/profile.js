const initialState = {
    isLoggedIn: false,
    userDetails: {}
  };
  
  
  function profileReducer(state = initialState, action) {
    // reducer is function which the same state with initial value return different state on different actions
    switch (action.type) {
      case 'LOGIN_SUCCESSFULL':
        return {
          ...state,
          isLoggedIn: true,
          userDetails: action.data
        }
      case 'LOGOUT':
        return {
          ...state,
          isLoggedIn: false,
          userDetails: {}
        }
        case 'SESSION_EXPIRED':
        return {
          ...state,
          isLoggedIn: false,
          userDetails: {}
        }
      default:
        return state;
    }
  }
  
  export default profileReducer;