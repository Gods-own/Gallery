import { FETCH_USERS } from "./types";
import axios from 'axios';

export const fetchUsers =  () => dispatch => {
    axios.get('https://jsonplaceholder.typicode.com/users/')
    .then(response => dispatch({
        type: FETCH_USERS,
        payload: response.data
    }));

}