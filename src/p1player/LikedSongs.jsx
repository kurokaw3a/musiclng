import { useNavigate } from 'react-router-dom';
import styles from './LikedSongs.module.css'
import { useState } from 'react';

const LikedSongs = () => {
    const navigate = useNavigate()
    const navToMain = ()=>{
     navigate('/')
    }
    const [likedSongs] = useState(JSON.parse(localStorage.getItem('likedSongs')) || [])
    const navToSong = (id)=>{
     navigate(`${id}`)
    }
    return (
        <div className={styles.container}>
            <img title='back' onClick={navToMain} className={styles.backIcon} src='https://cdn-icons-png.flaticon.com/512/3114/3114883.png' alt='error'/>
            <div className={styles.likedSongsBlock}>
                {likedSongs?.map((el)=>(
                <div key={el.id} className={styles.likedSongBlock}>
                    <div onClick={()=>navToSong(el.id)} className={styles.imgBlock}>
                <img className={styles.img} src={el.img} alt='error'/>
                    </div>
                <h2>{el.name}</h2>
                <h2>{el.author}</h2>
                </div>
                ))}
            </div>
        </div>
    );
};

export default LikedSongs;