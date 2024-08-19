import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    user: {},
    isAuth: false,
  },
  reducers: {
    login: (state, action) => {
      state.isAuth = true;
      state.user = action.payload;
    },
    logoutAction: (state, action) => {
      state.isAuth = false;
      state.user = {};
    },
    selction:(state , action) => {
      if (action.type === 'BUS_SELECTION') {
        return { ...state, selectedBusId: action.id };
      } else if (action.type === 'SEAT_SELECTION') {
        return { ...state, selectedSeats: action.seats };
      }
      return state;
    }

  },
});

export const { login, logoutAction,selction } = loginSlice.actions;
export default loginSlice.reducer;
