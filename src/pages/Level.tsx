import { useParams } from 'react-router-dom';
import React, { useRef, useState } from 'react';
import useLevels from '../hooks/useLevels';
import cursorIMG from '../assets/cursor.svg';
import ChampionPicker from '../components/ChampionPicker';
import { isClickPositionInChampionPosition } from '../utils';

type LevelProps = {
  isGameOver: boolean;
  setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  navbarRef: React.MutableRefObject<HTMLElement | null>;
};

function Level({ isGameOver, setIsGameOver, navbarRef }: LevelProps) {
  const { id } = useParams();
  const [levels] = useLevels();
  const level = levels.find((level) => level.id === Number(id));
  const [clickedPosition, setClickedPosition] = useState({
    offsetX: 0,
    offsetY: 0,
    championX: 0,
    championY: 0,
  });
  const [isPickerShown, setIsPickerShown] = useState(false);
  const [championsFound, setChampionsFound] = useState<string[]>([]);
  const levelImgRef = useRef<HTMLImageElement | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    setIsPickerShown(!isPickerShown);
    if (isPickerShown) return;
    const { offsetX, offsetY } = e.nativeEvent;
    const { width, height } = e.currentTarget.getBoundingClientRect();
    const x = Math.round((offsetX / width) * 100);
    const y = Math.round((offsetY / height) * 100);
    setClickedPosition({
      offsetX,
      offsetY,
      championX: x,
      championY: y,
    });
  };

  const isChampionFound = (name: string) => {
    const targetChampion = level?.championPositions.find(
      (pos) => pos.name === name
    );
    if (
      targetChampion &&
      isClickPositionInChampionPosition(clickedPosition, targetChampion)
    ) {
      setChampionsFound([...championsFound, name]);
    }
    setIsPickerShown(false);
  };

  return (
    <main className="min-h-screen w-full">
      <div className="relative flex justify-center">
        {isPickerShown && (
          <ChampionPicker
            icons={level?.championIcons}
            clickedPosition={clickedPosition}
            isChampionFound={isChampionFound}
            championsFound={championsFound}
            levelImgRef={levelImgRef}
            navbarRef={navbarRef}
            setIsPickerShown={setIsPickerShown}
          />
        )}
        <img
          src={level?.imageURL}
          ref={levelImgRef}
          className="w-full"
          style={{
            cursor: `url('${cursorIMG}') 27 27, auto`,
          }}
          onClick={handleClick}
          draggable={false}
        />
      </div>
    </main>
  );
}

export default Level;
