import './index.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Error from './pages/Error';
import Root from './layouts/Root';
import Level from './pages/Level';
import Leaderboard from './pages/Leaderboard';
import { useState } from 'react';

function App() {
  const [championsFound, setChampionsFound] = useState<string[]>([]);
  return (
    <Routes>
      <Route element={<Root championsFound={championsFound} />}>
        <Route index element={<Home />} />
        <Route
          path="/level/:id"
          element={
            <Level
              championsFound={championsFound}
              setChampionsFound={setChampionsFound}
            />
          }
        />
        <Route path="/leaderboard/:levelId" element={<Leaderboard />}></Route>
      </Route>
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;
