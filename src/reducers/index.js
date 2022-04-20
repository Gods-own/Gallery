import { combineReducers } from 'redux';
import userReducer from './userReducer';
import albumReducer from './albumReducer';
import photoReducer from './photoReducer';
import likedPhotosReducer from './likedPhotosReducer';

export default combineReducers({
    users: userReducer,
    albums: albumReducer,
    photos: photoReducer,
    likedPhotos: likedPhotosReducer,
});