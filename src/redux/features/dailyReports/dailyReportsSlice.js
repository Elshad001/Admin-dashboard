import { createSlice } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer'
import storage from 'redux-persist/lib/storage'

const initialState = {
  showReports:[],
  showReportsForUser:[],
  showFilteredReports:[],
};


const dailyReportsSlice = createSlice({
  name: 'dailyReports',
  initialState,
  reducers: {
  
      setShowReports:(state,action) => {
        state.showReports=action.payload
    },
    
     setShowReportsForUser:(state,action) => {
        console.log(action.payload)
        state.showReportsForUser=action.payload
    },

    setShowFilterdReports:(state,action) => {
        state.showFilteredReports=action.payload?.data
    },
    
  },
});


const reducer = persistReducer(
  {
    key: 'dailyReports',
    storage,
    whitelist: [
  
    ],
  },
  dailyReportsSlice.reducer
)





export const { setShowReports ,  setShowReportsForUser ,  setShowFilterdReports } = dailyReportsSlice.actions;
export default reducer;