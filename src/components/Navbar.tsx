import teemo from '../assets/teemo.png';
import { Link, useParams } from 'react-router-dom';

function Navbar() {
  const { id } = useParams();
  return (
    <header
      className={`bg-secondary py-1 px-4 text-lg font-bold text-primary-100 sm:text-3xl ${
        id && 'sticky top-0 z-20'
      }`}
    >
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between">
        <Link to="/">
          <div className="flex items-center gap-4">
            <img className="h-20 w-20" src={teemo} />
            <h1 className="block">Where's Teemo?</h1>
          </div>
        </Link>
        <nav>
          <ul>
            <li>
              <Link to="/leaderboard">Leaderboard</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
