import teemo from '../assets/teemo.png';
import { useParams } from 'react-router-dom';
import Timer from './Timer';

type NavbarProps = {
  isGameOver: boolean;
  navbarRef: React.MutableRefObject<HTMLElement | null>;
};

function Navbar({ isGameOver, navbarRef }: NavbarProps) {
  const { id } = useParams();
  return (
    <header
      ref={navbarRef}
      className={`bg-secondary py-1 px-4 text-lg font-bold text-primary-100 sm:text-3xl ${
        id && 'sticky top-0 z-10'
      }`}
    >
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between">
        <div className="flex items-center gap-4">
          <img className="h-20 w-20" src={teemo} />
          <h1 className="">Where's Teemo?</h1>
        </div>
        {id && <Timer isGameOver={isGameOver} />}
        <nav>
          <ul>
            <li>Leaderboard</li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
