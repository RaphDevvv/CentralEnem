import React from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import App from '../App';
import Main from '../pages/Main';
import Authenticate from '../pages/Authenticate';
import Home from '../pages/Home';
import Simulados from '../pages/Simulados';
import Profile from '../pages/Profile';
import Dev from '../pages/Dev';
import SendQuestions from '../pages/SendQuestions';
import LessonSubject from '../pages/LessonSubject';
import LandingPage from '../pages/LandingPage';
import Desafios from '../pages/Desafios';
import Ranking from '../pages/Ranking';
import Statas from '../pages/Stats';
import Stats from '../pages/Stats';
import IsAdmin from '../permissions/IsAdmin';
import DiffUserProfile from '../pages/DiffUserProfile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: "/",
        element: <LandingPage /> 
      },
      {
        path: "main",
        element: <Main />,
        children: [
          {
            path: "simulados",
            element: <Simulados />
          },

          {
            path: "home",
            element: <Home />
          },
          {
            path: "desafios",
            element: <Desafios />
          },
          {
            path: "ranking",
            element: <Ranking />
          },
          {
            path: "estatisticas",
            element: <Stats />
          }
        ]
      },
      {
        path: "/auth",
        element: <Authenticate />
      },
      {
        path: "/profile",
        element: <Profile />
      },

      {
        path: "/user-profile/:name",
        element: <DiffUserProfile />
      },
      {
        path: "/dev",
        element: <Dev/>,
        children: [
          {
            path: 'sendq',
            element:  <IsAdmin><SendQuestions /></IsAdmin>  
          }
        ]
      },
      {
        path: "/lesson",
        element: <Outlet />,
        children: [
          {
            path: 'lin',
            element: <LessonSubject />
          },

          {
            path: 'hum',
            element: <LessonSubject />
          },

          {
            path: 'nat',
            element: <LessonSubject />
          },
          
          {
            path: 'mat',
            element: <LessonSubject />
          }
        ]
      }
    ]
  }
]);

export default router;
