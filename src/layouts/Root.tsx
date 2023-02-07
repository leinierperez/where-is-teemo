import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Root({ isGameOver }: { isGameOver: boolean }) {
  return (
    <>
      <Navbar isGameOver={isGameOver} />
      <Outlet />
    </>
  );
}

export default Root;
