import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	value: { email: null, token: null, isPro: null }
};

export const userSlice = createSlice({
<<<<<<< HEAD
	name: 'user',
	initialState,
	reducers: {
		AddLoginToStore: (state, action) => {
			state.value.email = action.payload.email;
			state.value.token = action.payload.token;
			state.value.isPro = action.payload.isPro;
		},
		disconnect: (state, action) => {
			state.value.email = null;
			state.value.token = null;
			state.value.isPro = null;
		}
	}
=======
  name: 'user',
  initialState,
  reducers: {
    AddLoginToStore: (state, action) => {
      state.value.email = action.payload.email;
      state.value.token = action.payload.token;
    },
    

  },
>>>>>>> reducer_inscription
});

export const { AddLoginToStore, disconnect } = userSlice.actions;
export default userSlice.reducer;
