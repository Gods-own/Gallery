import { FETCH_PHOTOS, NEW_PHOTO, UPDATED_PHOTO } from "../actions/types";

const initialState = {
    photos: [],
    photo: {},
    updPhoto: {}
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
                return {
                    ...state,
                    photo: action.payload
                }
            case UPDATED_PHOTO:
                action.payload.liked = false
                return {
                    ...state,
                    updPhoto: action.payload
                }    
        default:
            return state
    }
}