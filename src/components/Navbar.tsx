import teemo from '../assets/teemo.webp';
import { Link, useParams } from 'react-router-dom';
import { Levels } from '../hooks/useLevels';
import { getLevelById } from '../utils';

type NavbarProps = {
  levels: Levels;
  championsFound: string[];
};

function Navbar({ levels, championsFound }: NavbarProps) {
  const { id } = useParams();
  const levelIcons = getLevelById(levels, Number(id))?.championIcons;

  return (
    <header
      className={`
      bg-secondary py-1 px-4 text-lg font-bold text-primary-100 md:text-xl lg:text-3xl 
      ${id && 'sticky top-0 z-20'}`}
    >
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between">
        <Link to="/">
          <div className="flex items-center gap-4">
            <img alt="Teemo: website logo" className="h-20 w-20" src={teemo} />
            <h1 className="block">Where's Teemo?</h1>
          </div>
        </Link>
        {id && (
          <div className="flex gap-3">
            {levelIcons?.map((icon, i) => {
              if (championsFound.includes(icon.name)) return;
              return (
                <img
                  alt={`Icon for champion ${icon.name}`}
                  className="h-8 w-8 rounded-full border-2 border-primary-100 lg:h-12 lg:w-12"
                  src={icon.url}
                  key={i}
                />
              );
            })}
          </div>
        )}
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
