import './index.css';
import useLevels from './hooks/useLevels';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Error from './pages/Error';
import Root from './layouts/Root';

function App() {
  const [levels, isLoading, error] = useLevels();

  return (
    <Routes>
      <Route element={<Root />}>
        <Route index element={<Home levels={levels} />}></Route>
      </Route>
      <Route path="*" element={<Error />}></Route>
    </Routes>
  );
}

export default App;
