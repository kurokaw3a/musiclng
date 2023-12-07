import { useEffect } from 'react';
import './App.css';
import PlayerRoutes from './p1player/routes/PlayerRoutes';
import {useDispatch} from 'react-redux'
import { getAccessToken } from './store/PlayerActions';

function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getAccessToken())
  },[dispatch])
  return <PlayerRoutes />;
}

export default App;
