import './index.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Error from './pages/Error';
import Root from './layouts/Root';
import Level from './pages/Level';
import Leaderboard from './pages/Leaderboard';

function App() {
  return (
    <Routes>
      <Route element={<Root />}>
        <Route index element={<Home />} />
        <Route path="/level/:id" element={<Level />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Route>
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;
