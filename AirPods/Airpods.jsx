import { useState } from 'react';
import './Airpods.css';
import AirpodsDetect from './AirpodsDetect';

function Airpods() {
  const [close,setClose] = useState(false)
  const [show,setShow] = useState(false)
  const showHandler = ()=>{
   setShow(true)
   setClose(false)
  }
  const closeHanlder = ()=>{
    setClose(true)
   }
   console.log(window);
  return <div className='container'>
    <button className='show-button' onClick={showHandler}>show</button>
    {show && 
    <div className={close ? 'close' : 'pods'}> 
   <AirpodsDetect onClose={closeHanlder} />;
    </div>
  }
  </div>
}

export default Airpods;
