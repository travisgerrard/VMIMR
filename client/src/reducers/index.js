import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import conditionReducer from './conditionReducer';
import userReducer from './userReducer';
import landingReducer from './landingReducer';

export default combineReducers({
  form: reduxForm,
  auth: authReducer,
  conditions: conditionReducer,
  users: userReducer,
  landing: landingReducer
});
