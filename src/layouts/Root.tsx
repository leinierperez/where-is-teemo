import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

type RootProps = {
  isGameOver: boolean;
};

function Root({ isGameOver }: RootProps) {
  return (
    <>
      <Navbar isGameOver={isGameOver} />
      <Outlet />
    </>
  );
}

export default Root;
