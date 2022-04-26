import { FETCH_PHOTOS, NEW_PHOTO, UPDATED_PHOTO, FETCH_PHOTO } from "./types";
import axios from 'axios';

export const fetchPhotos = (albumId) => dispatch => {
    axios.get(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`)
    .then(response => dispatch({
        type: FETCH_PHOTOS,
        payload: response.data
    }))
}

export const createPhoto = ({ title, url, albumId }) => (dispatch, getState) => {
    const { photos } = getState()
    axios.post(
        `https://jsonplaceholder.typicode.com/photos`,

        { title, url, albumId }
        )
        .then(response => dispatch({
            type: NEW_PHOTO,
            payload: response.data,
            allPhotos: photos.photos
        }))
}

export const updPhoto = (updatedPhoto) => (dispatch, getState) => {
    const { photos } = getState()
    axios.put(
        `https://jsonplaceholder.typicode.com/photos/${updatedPhoto.id}`,
        updatedPhoto
    )
    .then(response => dispatch({
        type: UPDATED_PHOTO,
        payload: response.data,
        allPhotos: photos.photos
    }))
}

export const fetchPhoto = (clickedImage) => dispatch => {
    dispatch({
        type: FETCH_PHOTO,
        payload: clickedImage
    })
}