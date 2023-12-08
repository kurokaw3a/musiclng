import { Route, Routes } from "react-router-dom";
import Main from "../Main";
import Player from "../Player";
import LikedSongs from "../LikedSongs";

const PlayerRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path=":id" element={<Player/>}/>
            <Route path="likedSongs" element={<LikedSongs/>}/>
            <Route path="likedSongs/:id" element={<Player variant='albums'/>}/>
        </Routes>
    );
};

export default PlayerRoutes;