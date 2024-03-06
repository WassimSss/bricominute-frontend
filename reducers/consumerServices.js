import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: {
    step: 1,
    jobs : [],
    jobTasks : [],
    date : null,
    status: false,
    price: 0,
    idAddress : null
 },
};

export const consumerServicesSlice = createSlice({
 name: 'consumerService',

  initialState,
 reducers: {
   addJobToSore: (state, action) => {
     state.value.jobs.push(action.payload);
   },
   deleteJobToStore: (state, action) => {
    state.value.jobs = state.value.jobs.filter(e => e.name !== action.payload.name)
   },
   addJobTaskToSore: (state, action) => {
    state.value.jobTasks.push(action.payload);
  },
  deleteJobTaskToStore: (state, action) => {
   state.value.jobTasks = state.value.jobTasks.filter(e => e.name !== action.payload.name)
  },
  setDate: (state, action) => {
    state.value.date = action.payload
  },
  goToStep: (state, action) => {
    state.value.step = action.payload;
  },
   previousStep: (state, action) => {
    state.value.step = state.value.step - 1;
   },
   nextStep: (state, action) => {
    state.value.step = state.value.step + 1;
   }
 },
});

export const { addJobToSore, deleteJobToStore, addJobTaskToSore, deleteJobTaskToStore,setDate, goToStep, previousStep, nextStep } = consumerServicesSlice.actions;
export default consumerServicesSlice.reducer;