import './App.css';
import { getAccessToken } from './api/ApiFetch';
import PlayerRoutes from './p1player/routes/PlayerRoutes';

function App() {
    getAccessToken();
  return <PlayerRoutes />;
}

export default App;
