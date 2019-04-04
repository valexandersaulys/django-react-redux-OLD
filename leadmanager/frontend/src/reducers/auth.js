import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isLoading: false,
  user: null
};

export default function(state=initialState, action) {
  switch(action.type) {
  case USER_LOADING:
    return {
      ...state,
      isLoading: true
    };
  case USER_LOADED:
    return {
      ...state,
      isAuthenticated: true,
      isLoading: false,
      user: action.payload
    };
  case AUTH_ERROR:
    localStorage.removeItem('token');
    return {
      ...state,
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: false
    };
  case LOGIN_SUCCESS:
    localStorage.setItem('token', action.payload.token);
    return {
      ...state,
      ...action.payload,
      isAuthenticated: true,
      isLoading: false
    };
  case LOGIN_FAIL:
    localStorage.removeItem('token');
    return {
      ...state,
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: false
    };
  case LOGOUT_SUCCESS:
    localStorage.removeItem('token');
    return {
      ...state,
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: false
    };
  case LOGOUT_FAIL:
  case REGISTER_SUCCESS:
    localStorage.setItem('token', action.payload.token);
    return {
      ...state,
      ...action.payload,
      isAuthenticated: true,
      isLoading: false
    };
  case REGISTER_FAIL:
    localStorage.removeItem('token');
    return {
      ...state,
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: false
    };    
  default:
    return state;
  }
};
