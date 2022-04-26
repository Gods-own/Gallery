import { FETCH_PHOTOS, NEW_PHOTO, UPDATED_PHOTO, FETCH_PHOTO } from "../actions/types";

const initialState = {
    photos: [],
    updPhoto: {},
    clickedPhoto:{}
}

export default function photoReducer(state=initialState, action) {
    switch(action.type) {
        case FETCH_PHOTOS:
            let mappedPhotos = action.payload.map((photo) => {
                photo.liked = false
                return photo
            })
            return {
                ...state,
                photos: mappedPhotos
            }
        case NEW_PHOTO:
            action.payload.liked = false
            action.allPhotos.unshift(action.payload)
            return {
                ...state,
                photos: action.allPhotos
            }
        case UPDATED_PHOTO:
            const photoIndex = action.allPhotos.findIndex((photo) => photo.id === action.payload.id);

            if(photoIndex !== -1) {
                action.allPhotos.splice(photoIndex, 1, action.payload)
            }
            // console.log(action.allPhotos)
            return {
                ...state,
                photos: action.allPhotos,
                updPhoto: action.payload
            } 
        case FETCH_PHOTO:
            
            return {
                ...state,
                clickedPhoto: action.payload
            }       
        default:
            return state
    }
}