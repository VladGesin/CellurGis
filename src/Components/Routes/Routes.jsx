import React from 'react';
import { Route } from 'react-router-dom';
// eslint-disable-next-line
import MainPage from '../WelcomePage/login';
import ProjectsPage from '../ProjectsPage/ProjectsPage';

const routesData = [
  { component: ProjectsPage, path: '/', exact: true },
  // { component: ProjectsPage, path: '/ProjectsPage', private: true },
];

const Routes = () =>
  routesData.map((route) => <Route key={route.path} {...route} />);

export default Routes;
