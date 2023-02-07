import './index.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Error from './pages/Error';
import Root from './layouts/Root';
import { useState } from 'react';

function App() {
  const [isGameOver, setIsGameOver] = useState(false);
  return (
    <Routes>
      <Route element={<Root isGameOver={isGameOver} />}>
        <Route index element={<Home />}></Route>
      </Route>
      <Route path="*" element={<Error />}></Route>
    </Routes>
  );
}

export default App;
