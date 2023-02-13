import { useParams } from 'react-router-dom';
import React, { useRef, useState } from 'react';
import useLevels from '../hooks/useLevels';
import cursorIMG from '../assets/cursor.svg';
import ChampionPicker from '../components/ChampionPicker';
import { isClickPositionInChampionPosition } from '../utils';
import Status from '../components/Status';

type LevelProps = {
  isGameOver: boolean;
  setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>;
};

function Level({ isGameOver, setIsGameOver }: LevelProps) {
  const { id } = useParams();
  const [levels] = useLevels();
  const level = levels.find((level) => level.id === Number(id));
  const [clickedPosition, setClickedPosition] = useState({
    pageX: 0,
    pageY: 0,
    championX: 0,
    championY: 0,
  });
  const [isPickerShown, setIsPickerShown] = useState(false);
  const [championsFound, setChampionsFound] = useState<string[]>([]);
  const levelImgRef = useRef<HTMLImageElement | null>(null);
  const [isStatusShown, setIsStatusShown] = useState(false);
  const [championFound, setChampionFound] = useState(false);
  const statusTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const handleClick = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    setIsPickerShown(!isPickerShown);
    if (isPickerShown) return;
    const { pageX, pageY, offsetX, offsetY } = e.nativeEvent;
    const { width, height } = e.currentTarget.getBoundingClientRect();
    const x = Math.round((offsetX / width) * 100);
    const y = Math.round((offsetY / height) * 100);
    setClickedPosition({
      pageX,
      pageY,
      championX: x,
      championY: y,
    });
  };

  const isChampionFound = (name: string) => {
    clearTimeout(statusTimeoutRef.current);
    const targetChampion = level?.championPositions.find(
      (pos) => pos.name === name
    );
    if (
      targetChampion &&
      isClickPositionInChampionPosition(clickedPosition, targetChampion)
    ) {
      setChampionsFound([...championsFound, name]);
      setChampionFound(true);
    } else {
      setChampionFound(false);
    }
    setIsPickerShown(false);
    showStatus();
  };

  const showStatus = () => {
    setIsStatusShown(true);
    statusTimeoutRef.current = setTimeout(() => {
      setIsStatusShown(false);
    }, 2000);
  };

  return (
    <main className="min-h-screen w-full">
      {isPickerShown && (
        <ChampionPicker
          icons={level?.championIcons}
          clickedPosition={clickedPosition}
          isChampionFound={isChampionFound}
          championsFound={championsFound}
          levelImgRef={levelImgRef}
          setIsPickerShown={setIsPickerShown}
        />
      )}
      <div className="flex justify-center">
        {isStatusShown && (
          <Status
            championsFound={championsFound}
            championFound={championFound}
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
