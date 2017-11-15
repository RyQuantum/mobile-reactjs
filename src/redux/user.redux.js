import axios from 'axios';

const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';

const initState = {
  redirectTo: '',
  isAuth: false,
  msg: '',
  user: '',
  pwd: '',
  type: ''
};

const registerSuccess = data => ({type: REGISTER_SUCCESS, payload: data});
const errorMsg = msg => ({msg, type: ERROR_MSG});

export const user = (state = initState, action) => {
  switch(action.type) {
    case REGISTER_SUCCESS:
      return {...state, msg: '', redirectTo: '', isAuth: true, ...action.payload};
    case ERROR_MSG:
      return {...state, isAuth: false, msg: action.msg};
    default:
      return state;
  }
};

export const register = ({user, pwd, repeatPwd, type}) => {
  if (!user || !pwd || !type) {
    return errorMsg('Username and password cannot be empty!');
  } else if (pwd !== repeatPwd) {
    return errorMsg('Password and confirm password are not the same!');
  }
  return async dispatch => {
    const res = await axios.post('/user/register', {user, pwd, type});
    if (res.status === 200 && res.data.code === 0) {
      dispatch(registerSuccess({user, pwd, type}));
    } else {
      dispatch(errorMsg(res.data.msg));
    }
  }
};