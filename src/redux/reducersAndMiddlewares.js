import { combineReducers } from '@reduxjs/toolkit'
import { apiUser } from '@/redux/api/user/apiUser';
import { apiTeam } from '@/redux/api/team/apiTeam';
import { apiAuth } from '@/redux/api/auth/apiAuth';
import { apiProject } from '@/redux/api/project/apiProject';
import { apiReport } from '@/redux/api/report/apiReport';
import mainReducer from "@/redux/features/main/mainSlice";
import authReducer from "@/redux/features/auth/authSlice";
import usersReducer from "@/redux/features/users/usersSlice";
import projectReducer from "@/redux/features/project/projectSlice";
import dailyReportsReducer from "@/redux/features/dailyReports/dailyReportsSlice";


export const reducers = combineReducers({
  auth: authReducer,
  users: usersReducer,
  main: mainReducer,
  project: projectReducer ,
  dailyReports: dailyReportsReducer,
  [apiAuth.reducerPath]: apiAuth.reducer,
  [apiUser.reducerPath]: apiUser.reducer,
  [apiTeam.reducerPath]: apiTeam.reducer,
  [apiProject.reducerPath]: apiProject.reducer,
  [apiReport.reducerPath]: apiReport.reducer,
})


export const middlewares = [apiAuth.middleware, apiUser.middleware ,apiTeam.middleware ,apiProject.middleware ,apiReport.middleware]
