import React from "react";
import { Navigate } from 'react-router-dom';
import Url from '../url';

const Users = React.lazy(() => import("@/pages/Users"));
const Teams = React.lazy(() => import("@/pages/Teams"));
const Projects = React.lazy(() => import("@/pages/Projects"));
const DailyReports = React.lazy(() => import("@/pages/DailyReports"));




const routes = [

  {
    path: Url.USERS_URL,
    component: <Users />,
  },
  {
    path: Url.TEAMS_URL,
    component: <Teams />,
  },
  {
    path: Url.PROJECTS_URL,
    component: <Projects />,
  },
  {
    path: Url.DAILYREPORTS_URL,
    component: <DailyReports />,
  },
  {
    path: "*",
    component: <Navigate to={"/"}/>,
  },
];

export default routes;