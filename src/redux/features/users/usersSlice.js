import { createSlice } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer'
import storage from 'redux-persist/lib/storage'

const initialState = {
  user:null,
  showEmployees:[],
  otp:''
};


const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
  
      getShowEmployees:(state,action) => {
      state.showEmployees=action.payload?.data
    },
    
    setOtp:(state,action) => {
    state.otp=action.payload?.data
  },

  },
});


const reducer = persistReducer(
  {
    key: 'users',
    storage,
    whitelist: [
  
    ],
  },
  usersSlice.reducer
)





export const { setToken ,getShowEmployees ,setOtp } = usersSlice.actions;
export default reducer;