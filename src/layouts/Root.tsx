import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

type RootProps = {
  isGameOver: boolean;
  navbarRef: React.MutableRefObject<HTMLElement | null>;
};

function Root({ isGameOver, navbarRef }: RootProps) {
  return (
    <>
      <Navbar isGameOver={isGameOver} navbarRef={navbarRef} />
      <Outlet />
    </>
  );
}

export default Root;
