import React from 'react';
import { Route } from 'react-router-dom';
import MainPage from '../WelcomePage/login';
import ProjectsPage from '../MainPage/ProjectsPage';

const routesData = [
  { component: MainPage, path: '/', exact: true },
  { component: ProjectsPage, path: '/ProjectsPage' },
];

const Routes = () =>
  routesData.map((route) => <Route key={route.path} {...route} />);

export default Routes;
