import { FETCH_ALBUMS } from "./types";
import axios from "axios";

export const fetchAlbums = (userId) => dispatch => {
    axios.get(`https://jsonplaceholder.typicode.com/users/${userId}/albums`)
    .then(response => dispatch({
        type: FETCH_ALBUMS,
        payload: response.data
    }));
}