const initialState = {};

const userReducer = (state = initialState, action) => {
  console.log("AAAa", action);
  switch (action.type) {
    case "SET_USER":
      return action.data;
    default:
      return state;
  }
};

export const setGlobalUser = (user) => {
  console.log("user", user);
  return {
    type: "SET_USER",
    data: user,
  };
};

export default userReducer;
