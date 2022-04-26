import { FETCH_LIKED_PHOTOS, NEW_LIKED_PHOTO, DELETE_LIKED_PHOTO, DELETE_LIKED_PHOTO_WITH_ID, CLEAR_LIKED_PHOTOS } from "../actions/types";

const initialState = {
    likedPhotos: []
}

export default function likedPhotosReducer (state=initialState, action) {
    switch(action.type) {
        case FETCH_LIKED_PHOTOS:
            return {
                ...state,
                likedPhotos: action.payload
            }
        case NEW_LIKED_PHOTO:
            action.allLikedPhotos.unshift(action.payload)
            const newLikedPhoto = JSON.stringify(action.allLikedPhotos)
            localStorage.setItem('likedItems', newLikedPhoto)
            return {
                ...state,
                likedPhotos: action.allLikedPhotos
            }    
        case DELETE_LIKED_PHOTO_WITH_ID:
            action.allLikedPhotos = action.allLikedPhotos.filter((likedItem) => likedItem.id !== action.payload)
            const modPhotos = JSON.stringify(action.allLikedPhotos);
            localStorage.setItem('likedItems', modPhotos)
            return {
                ...state,
                likedPhotos: action.allLikedPhotos
            }    
        case DELETE_LIKED_PHOTO:
            if (action.payload !== -1) {
                action.allLikedPhotos.splice(action.payload, 1)
            }
            const modLikedItems  = JSON.stringify(action.allLikedPhotos)   
            localStorage.setItem('likedItems', modLikedItems)
            console.log(action.payload, action.allLikedPhotos)
            let newArray = [...action.allLikedPhotos]
            return {
                ...state,
                likedPhotos: newArray
            }
        case CLEAR_LIKED_PHOTOS:
            action.allLikedPhotos = []
            const newItems = JSON.stringify(action.allLikedPhotos)
            localStorage.setItem('likedItems', newItems)
            return {
                ...state,
                likedPhotos: action.allLikedPhotos
            }
        default:
            return state
    }
}