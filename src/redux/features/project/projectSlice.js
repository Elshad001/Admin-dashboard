import { createSlice} from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer'
import storage from 'redux-persist/lib/storage'

const initialState = {
 showProjects: [],
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers:{
    getShowProjects:(state,action) => {
    state.showProjects=action?.payload
  },
},
});

const reducer = persistReducer(
  {
    key: 'project',
    storage,
    whitelist: [
     
    ],
  },
  projectSlice.reducer
)




export const { getShowProjects } = projectSlice.actions;
export default reducer;