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
import LessonLin from '../pages/LessonLin';
import LessonNat from '../pages/LessonNat';
import LandingPage from '../pages/LandingPage';
import LessonHum from '../pages/LessonHum';
import Desafios from '../pages/Desafios';
import Ranking from '../pages/Ranking';
import Statas from '../pages/Stats';
import Stats from '../pages/Stats';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: "/",
        element: <LandingPage /> // This will show the landing page as the default page
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
        path: "/dev",
        element: <Dev />,
        children: [
          {
            path: 'sendq',
            element: <SendQuestions />
          }
        ]
      },
      {
        path: "/lesson",
        element: <Outlet />,
        children: [
          {
            path: 'lin',
            element: <LessonLin />
          },

          {
            path: 'hum',
            element: <LessonHum />
          },

          {
            path: 'nat',
            element: <LessonNat/>
          }
        ]
      }
    ]
  }
]);

export default router;
