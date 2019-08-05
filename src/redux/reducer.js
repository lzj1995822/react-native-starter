import { combineReducers } from 'redux';

// ## Generator Reducer Imports
import gallery from '../modules/gallery/GalleryState';
import app from '../modules/AppState';
import calendar from '../modules/calendar/CalendarState';
import token from '../modules/token/Token';

export default combineReducers({
  // ## Generator Reducers
  gallery,
  app,
  calendar,
  token
});
