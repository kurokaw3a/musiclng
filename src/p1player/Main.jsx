import React, { useEffect, useState } from 'react';
import styles from './Main.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { getSearchSong } from '../store/PlayerActions';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import { PlayerSlice } from '../store/PlayerSlice';

const Main = () => {
    const [value,setValue] = useState('')

    const dispatch = useDispatch()
    const {searchResult,searchStatus} = useSelector((state)=>state.player)

    const searchHandler = (event)=>{
     setValue(event.target.value)
     if(value.trim().length >= 2){
        dispatch(getSearchSong({songName:value}))
    }
}
useEffect(()=>{
    if(value.length < 1){
        dispatch(PlayerSlice.actions.clearResult())
    }
},[dispatch, value])
    const navigate = useNavigate()
    const navToSong = (id)=>{
     navigate(id)
    }
    const navToLikedSongs = ()=>{
     navigate('likedSongs')
    }
    const likedSongs = JSON.parse(localStorage.getItem('likedSongs')) || []
    return (
        <div className={styles.container}>
            <div className={styles.formSearch}>
             <input className={styles.searchInput} type='text' value={value} onChange={searchHandler} placeholder='song name' />
            {likedSongs.length >= 1 ? <img title='liked songs' onClick={navToLikedSongs} className={styles.likedSongs} src='https://icones.pro/wp-content/uploads/2021/02/icone-de-coeur-gris.png' alt='none'/> : ''}
            </div>
            {searchStatus === 'pending' && <Loader/>}
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