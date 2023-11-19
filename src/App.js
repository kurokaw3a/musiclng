import { useState } from 'react';
import AirpodsDetect from './AirPods/AirpodsDetect';
import './App.css';

function App() {
  const [close,setClose] = useState(false)
  const [show,setShow] = useState(false)
  const showHandler = ()=>{
   setShow(true)
   setClose(false)
  }
  const closeHanlder = ()=>{
    setClose(true)
   }
  return <div className='container'>
    <button className='show-button' onClick={showHandler}>show</button>
    {show && 
    <div className={close ? 'close' : 'pods'}> 
   <AirpodsDetect onClose={closeHanlder} />;
    </div>
  }
  </div>
}

export default App;
