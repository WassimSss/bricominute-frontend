import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { email: null, token: null },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    AddLoginToStore: (state, action) => {
      state.value.email = action.payload.email;
      state.value.token = action.payload.token;
    },

  },
});

export const { AddLoginToStore } = userSlice.actions;
export default userSlice.reducer;