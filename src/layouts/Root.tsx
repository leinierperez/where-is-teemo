import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

type RootProps = {
  championsFound: string[];
};

function Root({ championsFound }: RootProps) {
  return (
    <>
      <Navbar championsFound={championsFound} />
      <Outlet />
    </>
  );
}

export default Root;
