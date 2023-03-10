import { useEffect, useLayoutEffect, useRef } from 'react';
import { ClickedPosition } from '../types/ClickedPosition';
import { ChampionIcon } from '../types/Level';

type ChampionPickerProps = {
  icons?: ChampionIcon[];
  clickedPosition: ClickedPosition | undefined;
  handleChampionChoice: (name: string) => void;
  championsFound: string[];
  setIsPickerShown: React.Dispatch<React.SetStateAction<boolean>>;
};

function ChampionPicker({
  icons,
  clickedPosition,
  handleChampionChoice,
  championsFound,
  setIsPickerShown,
}: ChampionPickerProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsPickerShown(false);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useLayoutEffect(() => {
    if (!ref.current || !clickedPosition) return;
    const spaceFromCursor = 20;
    let left = clickedPosition.pageX + spaceFromCursor;
    let top = clickedPosition.pageY + spaceFromCursor;
    const championPickerWidth = ref.current.scrollWidth;
    const championPickerHeight = ref.current.scrollHeight;
    const innerHeight = window.innerHeight;
    const scrollY = window.scrollY;
    const minWidth = left + championPickerWidth;
    const minHeight = top + championPickerHeight;
    const maxHeight = innerHeight + scrollY;
    const maxWidth = window.innerWidth;
    if (minWidth > maxWidth) {
      left = maxWidth - championPickerWidth - championPickerWidth / 4;
    }
    if (minHeight > maxHeight) {
      top = maxHeight - championPickerHeight - championPickerHeight / 4;
    }
    ref.current.style.left = `${left}px`;
    ref.current.style.top = `${top}px`;
  }, []);

  return (
    <>
      <div
        ref={ref}
        className="absolute z-10 rounded-lg bg-secondary text-primary-100 hover:cursor-pointer"
      >
        <ul>
          {icons?.map((icon, i) => {
            if (championsFound.includes(icon.name)) return;
            return (
              <li
                className="flex items-center gap-3 py-2 px-4 first:rounded-t-lg last:rounded-b-lg hover:bg-primary-100 hover:text-white"
                key={i}
                onClick={() => handleChampionChoice(icon.name)}
              >
                <img
                  alt={`Icon for champion ${icon.name}`}
                  className="h-9 w-9"
                  src={icon.url}
                />
                <p className="">{icon.name}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default ChampionPicker;
