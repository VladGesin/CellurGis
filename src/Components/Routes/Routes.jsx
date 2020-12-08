import React from 'react'
import { Route } from "react-router-dom";
import Workspace from '../WorkspacePage/Workspace'
import Mappage from '../MapPage/Mappage'
import MainPage from '../MainPage/MainPage'

const routesData =[
  {component: MainPage,path:"/" ,exact: true},
  {component: Mappage ,path:"/Mappage"},
  {component: Workspace,path:"/Workspace"}
];

const Routes =()=> 
  routesData.map((route)=>
    <Route key={route.path} {...route} />
    );


export default Routes
