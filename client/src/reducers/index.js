import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import conditionReducer from './conditionReducer';

export default combineReducers({
  form: reduxForm,
  auth: authReducer,
  conditions: conditionReducer
});
