import { useParams } from 'react-router-dom';
import React, { useState } from 'react';
import useLevels from '../hooks/useLevels';
import cursorIMG from '../assets/cursor.svg';

function Level({
  isGameOver,
  setIsGameOver,
}: {
  isGameOver: boolean;
  setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { id } = useParams();
  const [levels] = useLevels();
  const level = levels.find((level) => level.id === Number(id));
  const [clickedPosition, setClickedPosition] = useState({
    pageX: 0,
    pageY: 0,
    championX: 0,
    championY: 0,
  });

  const handleClick = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const { pageX, pageY, offsetX, offsetY } = e.nativeEvent;
    const { width, height } = e.currentTarget.getBoundingClientRect();
    const x = Math.round((offsetX / width) * 100);
    const y = Math.round((offsetY / height) * 100);
    setClickedPosition({
      pageX: pageX,
      pageY: pageY,
      championX: x,
      championY: y,
    });
  };

  return (
    <main className="min-h-screen w-full">
      <div className="relative flex justify-center">
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
