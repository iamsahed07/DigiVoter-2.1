import Header from './Header';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

function OuterLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default OuterLayout;
