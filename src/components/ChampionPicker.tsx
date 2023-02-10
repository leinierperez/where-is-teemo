import { useEffect, useLayoutEffect, useRef } from 'react';
import { ChampionIcon } from '../hooks/useLevels';

type ChampionPickerProps = {
  icons?: ChampionIcon[];
  clickedPosition: {
    offsetX: number;
    offsetY: number;
    championX: number;
    championY: number;
  };
  isChampionFound: (name: string) => void;
  championsFound: string[];
  levelImgRef: React.MutableRefObject<HTMLImageElement | null>;
  navbarRef: React.MutableRefObject<HTMLElement | null>;
  setIsPickerShown: React.Dispatch<React.SetStateAction<boolean>>;
};

function ChampionPicker({
  icons,
  clickedPosition,
  isChampionFound,
  championsFound,
  levelImgRef,
  navbarRef,
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
    if (!ref.current || !levelImgRef.current || !navbarRef.current) return;
    let left = clickedPosition.offsetX + 20;
    let top = clickedPosition.offsetY + 20;
    const navbarHeight = navbarRef.current.clientHeight;
    const imageWidth = ref.current.scrollWidth;
    const imageHeight = ref.current.scrollHeight;
    const innerHeight = window.innerHeight;
    const scrollY = window.scrollY;
    const minWidth = left + imageWidth;
    const minHeight = top + imageHeight;
    const maxHeight = innerHeight - navbarHeight + scrollY;
    const maxWidth = levelImgRef.current.width;
    if (minWidth > maxWidth) {
      left = maxWidth - imageWidth - imageWidth / 4;
    }
    if (minHeight > maxHeight) {
      top =
        innerHeight - imageHeight + scrollY - navbarHeight - imageHeight / 4;
    }

    left = (left / maxWidth) * 100;
    top = (top / levelImgRef.current.height) * 100;
    ref.current.style.left = `${left}%`;
    ref.current.style.top = `${top}%`;
  }, []);

  return (
    <>
      <div
        ref={ref}
        className="absolute rounded-lg bg-secondary text-primary-100 hover:cursor-pointer"
      >
        <ul>
          {icons?.map((icon, i) => {
            if (championsFound.includes(icon.name)) return;
            return (
              <li
                className="flex items-center gap-3 py-2 px-4 first:rounded-t-lg last:rounded-b-lg hover:bg-primary-100 hover:text-white"
                key={i}
                onClick={() => isChampionFound(icon.name)}
              >
                <img className="h-9 w-9" src={icon.url} />
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
