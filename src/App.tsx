import './index.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Error from './pages/Error';
import Root from './layouts/Root';
import Level from './pages/Level';
import Leaderboard from './pages/Leaderboard';
import useLevels from './hooks/useLevels';
import { useState } from 'react';

function App() {
  const [levels] = useLevels();
  const [currentLevel, setCurrentLevel] = useState<number | undefined>();
  const [championsFound, setChampionsFound] = useState<string[]>([]);

  return (
    <Routes>
      <Route element={<Root levels={levels} championsFound={championsFound} />}>
        <Route index element={<Home levels={levels} />} />
        <Route
          path="/level/:id"
          element={
            <Level
              levels={levels}
              setCurrentLevel={setCurrentLevel}
              championsFound={championsFound}
              setChampionsFound={setChampionsFound}
            />
          }
        />
        <Route
          path="/leaderboard"
          element={
            <Leaderboard
              levels={levels}
              currentLevel={currentLevel}
              setCurrentLevel={setCurrentLevel}
            />
          }
        />
      </Route>
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;
