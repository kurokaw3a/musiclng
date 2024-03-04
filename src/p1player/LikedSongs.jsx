import { useNavigate } from 'react-router-dom';
import styles from './LikedSongs.module.css'
import { useState } from 'react';
import spotifyIcon from '../assets/spotifyIcon.png'

const LikedSongs = () => {
    const navigate = useNavigate()
    const navToMain = ()=>{
     navigate('/')
    }
    const [likedSongs, setLikedSongs] = useState(JSON.parse(localStorage.getItem('likedSongs')) || [])
    const navToSong = (id)=>{
     navigate(`${id}`)
    }
    const [editModal,setEditModal] = useState(null)
    const showEditModal = (id)=>{
        setEditModal(id)
    }
    const closeEditModal = ()=>{
     setEditModal(null)
    }
    const deleteLikedSong = (id)=>{
        setLikedSongs(likedSongs?.filter((el)=>el.id !== id))
      localStorage.setItem('likedSongs', JSON.stringify(likedSongs?.filter((el)=>el.id !== id)))
      localStorage.removeItem(id)
    }
    return (
        <div className={styles.container}>
            <nav className={styles.navigation}>
                  <img title='back' onClick={navToMain} className={styles.backIcon} src='https://icon-library.com/images/white-back-icon/white-back-icon-7.jpg' alt='error'/>
            <div className={styles.nav}>
                  <h2>Понравившеися</h2>
            </div>
            </nav>
            <div className={styles.likedSongsBlock}>
                {likedSongs?.map((el)=>(
                <div key={el.id} className={styles.likedSongBlock}>
                    <div className={styles.liked}>
                    <div onClick={()=>navToSong(el.id)} className={styles.imgBlock}>
                <img className={styles.img} src={el.img} alt='error'/>
                    </div>
                    <div className={styles.info}>
                <h3>{el.name}</h3>
                <h4>{el.author}</h4>
                    </div>
                    </div>
                    <img rel='_prefetch' onClick={()=>showEditModal(el.id)} className={styles.edit} src="https://icones.pro/wp-content/uploads/2021/04/icone-menu-cercles-gris.png" alt="none" />
                    {editModal === el.id && <>
                    <div onClickCapture={closeEditModal} className={styles.backdrop}/>
                     <div className={styles.editBlock}>
                        <div onClickCapture={()=>deleteLikedSong(el.id)} className={styles.editLine}>
                        <img style={{width:"30px", height:"30px"}} src="https://cdn1.iconfinder.com/data/icons/hawcons/32/699013-icon-27-trash-can-512.png" alt="none" />
                        <p>delete</p>
                        </div>
                        <a style={{textDecoration:"none", color:"white"}} target='blank' href={el.spotifyUrl}>
                        <div className={styles.editLine}>
                        <img style={{width:"30px", height:"30px"}} src={spotifyIcon} alt="none" />
                        <p>spotify</p>
                        </div>
                        </a>
                        </div>
                    </>
                        }
                </div>
                ))}
            </div>
        </div>
    );
};

export default LikedSongs;