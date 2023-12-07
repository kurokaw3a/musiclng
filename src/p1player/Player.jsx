import styles from './Player.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { playerIcons } from './icons/icons';
import { useEffect, useRef, useState } from 'react';
import { getCurrentSong } from '../store/PlayerActions';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from './Loader';

const Player = ({variant}) => {
  const {currentSong, currentSongStatus} = useSelector((state)=>state.player)
   const dispatch = useDispatch()
   const {id} = useParams()
   useEffect(()=>{
    dispatch(getCurrentSong({id}))
  }, [dispatch, id])
  

   const [isPlaying,setIsPlaying] = useState(null)
   const songHandler = ()=>{
    setIsPlaying((prev)=>!prev)
  }

   const [trackProgress,setTrackProgress] = useState(0)
   const [trackVolume,setTrackVolume] = useState(50)
   
   const audioRef = useRef(new Audio(currentSong?.url))
   const intervalRef = useRef()
   

   const startTimer = ()=>{
         clearInterval(intervalRef.current)
         intervalRef.current = setInterval(()=>{
          if(audioRef.current.ended){
             setIsPlaying(false)
             setTrackProgress(0)
          }else{
            setTrackProgress(audioRef.current.currentTime.toFixed())
          }
        },1000)
      }
   useEffect(()=>{
   if(isPlaying && audioRef.current){
       audioRef.current.src = currentSong?.url
       audioRef.current.volume = trackVolume / 100
       audioRef.current.play()
       audioRef.current.currentTime = trackProgress
       startTimer()
  }else{
    clearInterval(intervalRef.current)
    audioRef.current.pause()
  }
  },[isPlaying])

  const progressHandler = (event)=>{
    audioRef.current.currentTime = event.target.value
    setTrackProgress(event.target.value)
 }
 const volumeHandler = (event)=>{
 setTrackVolume(event.target.value)
 audioRef.current.volume  = trackVolume / 100
}

  useEffect(()=>{
   return ()=>{
   audioRef.current.pause()
   clearInterval(intervalRef.current)
   setTrackProgress(0)
  }
  },[])

  const navigate= useNavigate()
  let likedSongs = JSON.parse(localStorage.getItem('likedSongs')) || []

  const navToBack = ()=>{
    if(likedSongs?.length <= 0){
      navigate('/')
    }else{
      navigate(-1)
    }
   audioRef.current.pause()
   clearInterval(intervalRef.current)
  }
 
  const [isLiked,setIsLiked] = useState(localStorage.getItem(id))
  const likeSong = ()=>{
    localStorage.setItem(id,true)
    setIsLiked((prev)=>!prev)
    if(!isLiked){
      likedSongs.push(currentSong)
      localStorage.setItem('likedSongs', JSON.stringify(likedSongs))
    }else{
      likedSongs = likedSongs.filter((el)=>el.id !== id)
      localStorage.setItem('likedSongs',JSON.stringify(likedSongs))
      localStorage.removeItem(id)
    }
  }

  return (
    <div className={styles.container}>
      <img title='back' onClick={navToBack} className={styles.backIcon} src='https://cdn-icons-png.flaticon.com/512/3114/3114883.png' alt='error'/>
      <img title='back' onClick={navToBack} className={styles.backIcon2} src='https://static.thenounproject.com/png/1394897-200.png' alt='error'/>
      {currentSongStatus === 'pending' && <Loader/>}
      {currentSongStatus === 'success' && 
      <div className={styles.bg}>
        <div className={styles.block}>
          <img className={styles.image} src={currentSong?.img || 'https://play-lh.googleusercontent.com/QovZ-E3Uxm4EvjacN-Cv1LnjEv-x5SqFFB5BbhGIwXI_KorjFhEHahRZcXFC6P40Xg'} alt='error' />
          <div className={styles.titleBlock}>
            <h1>{currentSong?.name}</h1>
            <h2>{currentSong?.author}</h2>
          </div>
          <div className={styles.rangeBlock}>
            <div className={styles.time}>
              <p>{`00:${trackProgress < 10 ? 0 : ''}${trackProgress}` || "00:00"}</p>
              <p>30</p>
            </div>
            <input className={styles.range} type='range' max='30' onClickCapture={progressHandler} onChange={progressHandler} value={trackProgress}/>
          </div>
          <div className={styles.controlsBlock}>
            {variant === "albums" ?
            <div className={styles.controls}>
            <img className={styles.controlsIconBack} src={playerIcons.nextIcon} alt='error'/>
            </div> : <div title='on spotify' className={styles.controls}>
              <a target='blank' href={currentSong?.spotifyUrl}>
            <img className={styles.controlsIcon} src={playerIcons.spotifyIcon} alt='error'/>
              </a>
            </div>
            }
            <div title={isPlaying ? "stop" : "play"} onClick={songHandler} className={styles.controls}>
            <img className={isPlaying ? styles.controlsIconPause : styles.controlsIconPlay} src={isPlaying ? playerIcons.pauseIcon : playerIcons.playIcon} alt='error'/>
            </div>
            {variant === 'albums' ?
            <div className={styles.controls}>
            <img className={styles.controlsIconNext} src={playerIcons.nextIcon} alt='error'/>
            </div> : <div title={!isLiked ? "like" :"dislike"} onClick={likeSong} className={styles.controls}>
            <img className={styles.controlsIcon} src={!isLiked ? playerIcons.likeIconTransparent : playerIcons.likeIcon} alt='error'/>
            </div>
            }
          </div>
          <div className={styles.volumeBlock}>
            <img className={styles.speakerIcon} src={playerIcons.speakerIcon} alt='error'/>
            <input className={styles.volumeRange} type='range' max='100' onChange={volumeHandler} value={trackVolume}/>
            <div className={styles.speakerActive}>
            <img className={styles.speakerIcon} src={playerIcons.speakerIcon} alt='error'/>
            {trackVolume <= 0 ? '' : 
            <p className={styles.speakerVolumeDown}>)</p>
            }
            {trackVolume > 40 && 
            <p className={styles.speakerVolumeUp}>)</p>
            }
            {trackVolume > 75 && 
            <p className={styles.speakerVolumeMax}>)</p>
            }
            </div>
          </div>
        </div>
      </div>
  }
    </div>
  )
};

export default Player;
