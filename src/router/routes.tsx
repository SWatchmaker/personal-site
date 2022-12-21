import React from 'react';
import { Navigate, Route } from '@tanstack/react-location';
import WelcomPage from '../pages/WelcomePage';
import HomePage from '../pages/HomePage';

const routes: Route[] = [
  {
    path: '/welcome',
    element: <WelcomPage />,
  },
  {
    path: '/home',
    element: <HomePage />,
  },
  {
    element: <Navigate to='/welcome' />,
  },
];

export default routes;
