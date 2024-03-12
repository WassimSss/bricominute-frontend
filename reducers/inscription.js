import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { 
    firstName: null, 
    lastName: null, 
    email: null, 
    password: null,
    confirmPassword : null,
    isPro: null, 
    company_name: null, 
    description: null,
    specialities: [], 
    kbis: null, 
    insurance_certificate: null,
    rib: null,
    setSelectedFiles: null,
 },
};

export const userSlice = createSlice({
  name: 'inscription',
  initialState,
  reducers: {
    setFirstName : (state, action) => {
      state.value.firstName = action.payload
    },
    setLastName : (state, action) => {
      state.value.lastName = action.payload
    },
    setEmail : (state, action) => {
      state.value.email = action.payload
    },
    setPassword : (state, action) => {
      state.value.password = action.payload
    },
    setConfirmPassword : (state, action) => {
      state.value.confirmPassword = action.payload
    },
    setIsPro : (state, action) => {
      state.value.isPro =  action.payload
    },
    setCompany_name : (state, action) => {
      state.value.company_name = action.payload
    },
    setDescription : (state, action) => {
      state.value.description = action.payload
    },
    setSpecialities : (state, action) => {
      if(!state.value.specialities.includes(action.payload)){
        state.value.specialities.push(action.payload)
      } else {
        state.value.specialities = state.value.specialities.filter(e => e !== action.payload)
      }
    },
    reset : (state, action) => {
      state.value = { 
        firstName: null, 
        lastName: null, 
        email: null, 
        password: null,
        confirmPassword : null,
        isPro: null, 
        company_name: null, 
        description: null,
        specialities: [], 
        kbis: null, 
        insurance_certificate: null,
        rib: null,
        setSelectedFiles: null,
     }
    }
    },

  });

export const { setFirstName, setLastName, setEmail, setPassword, 
  setConfirmPassword, setIsPro, setCompany_name, setDescription,
  setSpecialities, reset  } = userSlice.actions;
export default userSlice.reducer;