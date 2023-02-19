import { useParams } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import { Levels } from '../hooks/useLevels';
import cursorIMG from '../assets/cursor.svg';
import ChampionPicker from '../components/ChampionPicker';
import { getLevelById, isClickPositionInChampionPosition } from '../utils';
import Status from '../components/Status';
import GameOverModal from '../components/GameOverModal';
import LoadingSpinner from '../components/LoadingSpinner';

type LevelProps = {
  levels: Levels;
  championsFound: string[];
  setChampionsFound: React.Dispatch<React.SetStateAction<string[]>>;
};

function Level({ levels, championsFound, setChampionsFound }: LevelProps) {
  const { id } = useParams();
  const level = getLevelById(levels, Number(id));
  const [clickedPosition, setClickedPosition] = useState({
    pageX: 0,
    pageY: 0,
    championX: 0,
    championY: 0,
  });
  const [isPickerShown, setIsPickerShown] = useState(false);
  const [isStatusShown, setIsStatusShown] = useState(false);
  const [championFound, setChampionFound] = useState('');
  const statusTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const [elapsedSeconds, setElapsedSeconds] = useState(Date.now());
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    if (championsFound.length === level?.championPositions.length) {
      setIsGameOver(true);
      setChampionsFound([]);
      setElapsedSeconds((Date.now() - elapsedSeconds) / 1000);
    }
  }, [championsFound]);

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

  const handleChampionChoice = (name: string) => {
    clearTimeout(statusTimeoutRef.current);
    const targetChampion = level?.championPositions.find(
      (pos) => pos.name === name
    );
    if (
      targetChampion &&
      isClickPositionInChampionPosition(clickedPosition, targetChampion)
    ) {
      setChampionsFound([...championsFound, name]);
      setChampionFound(name);
    } else {
      setChampionFound('');
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
          handleChampionChoice={handleChampionChoice}
          championsFound={championsFound}
          setIsPickerShown={setIsPickerShown}
        />
      )}
      <div className="relative flex justify-center">
        {isGameOver && (
          <GameOverModal
            elapsedSeconds={elapsedSeconds}
            setIsGameOver={setIsGameOver}
          />
        )}
        {isStatusShown && <Status championFound={championFound} />}
        <img
          src={level?.imageURL}
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
