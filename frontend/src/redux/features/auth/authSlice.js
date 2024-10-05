import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: null, user: null },
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken } = action.payload;
      localStorage.setItem("jwt", accessToken);
      state.user = jwtDecode(accessToken);
    },
    // eslint-disable-next-line no-unused-vars
    logOut: (state, action) => {
      localStorage.removeItem("jwt");
      state.user = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice;

export const selectCurrentUser = (state) => state.auth.user?.UserInfo;
