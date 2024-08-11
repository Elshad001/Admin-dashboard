import { createSlice} from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer'
import storage from 'redux-persist/lib/storage'

const initialState = {
 isDarkModeOpen:false,
 isSideMenuOpen:true ,
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers:{
    openDarkMode:(state) => {
    state.isDarkModeOpen=true
  },

  closeDarkMode:(state) => {
    state.isDarkModeOpen=false
  },
  openSideMenu:(state) => {
    state.isSideMenuOpen=false
  },

  closeSideMenu:(state) => {
    state.isSideMenuOpen=true
  },
},
});

const reducer = persistReducer(
  {
    key: 'main',
    storage,
    whitelist: [
      'isDarkModeOpen',
      'isSideMenuOpen',
    ],
  },
  mainSlice.reducer
)




export const {openDarkMode,closeDarkMode ,  openSideMenu , closeSideMenu} = mainSlice.actions;
export default reducer;