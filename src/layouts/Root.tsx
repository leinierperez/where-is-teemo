import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Levels } from '../hooks/useLevels';

type RootProps = {
  levels: Levels;
  championsFound: string[];
};

function Root({ levels, championsFound }: RootProps) {
  return (
    <>
      <Navbar levels={levels} championsFound={championsFound} />
      <Outlet />
    </>
  );
}

export default Root;
