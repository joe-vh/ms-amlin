import {
  SET_USER_DATA,
  SET_LOG_IN_SUCCESS,
  SET_SIGN_UP_SUCCESS,
  SET_SIGN_UP_ERROR_MESSAGE
} from '../actionTypes';
import {User} from './User';

const initialState = {
  currentUser: {
    email: null,
    name: null,
    password: null
  },
  logInSuccess: false,
  signUpSuccess: false,
  signUpErrorMessage: ''
};

interface UserAction {
  type: string;
  data: User
}

interface LogInAction {
  type: string;
  data: boolean
}

interface SignUpAction {
  type: string;
  data: boolean
}

type Action = UserAction | LogInAction | SignUpAction;

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_USER_DATA: {
      return {
        ...state,
        currentUser: action.data
      };
    }
    case SET_LOG_IN_SUCCESS: {
      return {
        ...state,
        logInSuccess: action.data
      };
    }
    case SET_SIGN_UP_SUCCESS: {
      return {
        ...state,
        signUpSuccess: action.data
      };
    }
    case SET_SIGN_UP_ERROR_MESSAGE: {
      return {
        ...state,
        signUpErrorMessage: action.data
      };
    }
    default:
      return state;
  }
};

export default reducer;
