import { FETCH_LIKED_PHOTOS, NEW_LIKED_PHOTO, DELETE_LIKED_PHOTO, DELETE_LIKED_PHOTO_WITH_ID, CLEAR_LIKED_PHOTOS } from "./types";

export const fetchLikedItems = () => dispatch => {
    if (localStorage.getItem('likedItems')) {
        try {
            const likedPhotos = JSON.parse(localStorage.getItem('likedItems'));

            dispatch({
                type: FETCH_LIKED_PHOTOS,
                payload: likedPhotos
            })
        } catch (e) {
            localStorage.removeItem('likedItems');
        }
    }
} 

export const addLikedItem = (likedItem) => (dispatch, getState) => {
    const { likedPhotos } = getState()
    dispatch({
        type: NEW_LIKED_PHOTO,
        payload: likedItem,
        allLikedPhotos: likedPhotos.likedPhotos
    })
}

export const removeItemwithId = (id) => (dispatch, getState) => {
    const { likedPhotos } = getState()
    dispatch({
        type: DELETE_LIKED_PHOTO_WITH_ID,
        payload: id,
        allLikedPhotos: likedPhotos.likedPhotos
    })
}

export const removeLikedItem = (index) => (dispatch, getState) => {
    const { likedPhotos } = getState()
    dispatch({
        type: DELETE_LIKED_PHOTO,
        payload: index,
        allLikedPhotos: likedPhotos.likedPhotos
    })
}

export const clearLikedItems = () => (dispatch, getState) => {
    const { likedPhotos } = getState()
    dispatch({
        type: CLEAR_LIKED_PHOTOS,
        allLikedPhotos: likedPhotos.likedPhotos
    })
}