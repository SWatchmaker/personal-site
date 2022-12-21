import React, { useContext } from 'react';
import GlobalContext from '../contexts/GlobalContext';
import { Router, Outlet, ReactLocation } from '@tanstack/react-location';
import Header from '../containers/Header/Header';
import Footer from '../containers/Footer/Footer';
import routes from './routes';

const location = new ReactLocation();

const AppRouter = (): React.ReactElement => {
  const globalState = useContext(GlobalContext);
  const postWelcome = globalState?.postWelcome;

  return (
    <Router routes={routes} location={location} defaultElement='/welcome'>
      {postWelcome && <Header />}
      <Outlet />
      {postWelcome && <Footer />}
    </Router>
  );
};

export default AppRouter;
