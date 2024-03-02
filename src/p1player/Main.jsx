import React, { useEffect, useState } from 'react';
import styles from './Main.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { getSearchSong } from '../store/PlayerActions';
import { useNavigate } from 'react-router-dom';
import { PlayerSlice } from '../store/PlayerSlice';

const Main = () => {
    const [value,setValue] = useState('')

    const dispatch = useDispatch()
    const {searchResult,searchStatus} = useSelector((state)=>state.player)

    const searchHandler = (event)=>{
     setValue(event.target.value)
     if(event.target.value.trim().length > 1 && event.nativeEvent.inputType !== 'deleteContentBackward'){
        dispatch(getSearchSong({songName:value}))
    }
    if(event.target.value.trim().length < 2){
     dispatch(PlayerSlice.actions.clearResult())
    }
}
const navigate = useNavigate()
const navToSong = (id)=>{
    navigate(id)
    dispatch(PlayerSlice.actions.clearResult())
}
const navToLikedSongs = ()=>{
    navigate('likedSongs')
    dispatch(PlayerSlice.actions.clearResult())
    }
    const likedSongs = JSON.parse(localStorage.getItem('likedSongs')) || []
    return (
        <div className={styles.container}>
            <div className={styles.formSearch}>
             <input className={styles.searchInput} type='text' value={value} onInput={searchHandler} placeholder='что хотите послушать?' />
            {likedSongs.length >= 1 ? <img title='liked songs' onClick={navToLikedSongs} className={styles.likedSongs} src='https://icones.pro/wp-content/uploads/2021/02/icone-de-coeur-gris.png' alt='none'/> : ''}
            </div>
                <div className={styles.resultBlock}>
            {searchResult?.map((el)=>(
            searchStatus === 'success' && 
                        <div key={el.id} className={styles.result}>
                        <img onClick={()=>navToSong(el.id)} className={styles.songImg} src={el.img} alt='error'/>
                        <div className={styles.resultInfo}>
                        <h2 style={{color:"lightgray"}}>{el.author}</h2>
                        <h3 style={{wordBreak:"break-all"}}>{el.songName}</h3>
                        <h3>{el.durationMin}</h3>
                        </div>
                        </div>
                        ))}
            </div>
        </div>
    );
};

export default Main;