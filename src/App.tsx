import './index.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Error from './pages/Error';
import Root from './layouts/Root';
import Level from './pages/Level';
import { useRef, useState } from 'react';

function App() {
  const [isGameOver, setIsGameOver] = useState(false);
  const navbarRef = useRef<HTMLElement | null>(null);
  return (
    <Routes>
      <Route element={<Root isGameOver={isGameOver} navbarRef={navbarRef} />}>
        <Route index element={<Home />}></Route>
        <Route
          path="/level/:id"
          element={
            <Level
              isGameOver={isGameOver}
              setIsGameOver={setIsGameOver}
              navbarRef={navbarRef}
            />
          }
        ></Route>
      </Route>
      <Route path="*" element={<Error />}></Route>
    </Routes>
  );
}

export default App;
