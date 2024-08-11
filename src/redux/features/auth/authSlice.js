import { createSlice } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer'
import storage from 'redux-persist/lib/storage'



const initialState = {
  user: null,
  token:null,
  profile:null
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

    setLoggedOut: (state) => {
      state.token = null
    },
    setProfile: (state, action) => {
      state.profile = action.payload
    },
    setUser: (state, action) => {
      state.user = action.payload
    },
    setToken: (state, action) => {

      state.token = action.payload.token
  },
  },


});


const reducer = persistReducer(
  {
    key: 'auth',
    storage,
    whitelist: [
      'user',
      'token',
      'profile' ,
    ],
  },
  authSlice.reducer
)







export const { setLoggedOut, setProfile ,setToken ,setUser} = authSlice.actions;
export default reducer;