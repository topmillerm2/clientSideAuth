import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_MESSAGE } from './types';

const ROOT_URL = 'http://localhost:3090';

export const signinUser = ({ email, password }) => {
  return dispatch => {
    axios
      .post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/feature');
      })
      .catch(() => {
        dispatch(authError('Bad login Info'));
      });
  };
};
export const signUpUser = ({ email, password }) => {
  return dispatch => {
    axios
      .post(`${ROOT_URL}/signup`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/feature');
      })
      .catch(({ response }) => {
        dispatch(authError(response.data.error));
      });
  };
};

export function authError(error) {
  console.log(error);
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export const signoutUser = () => {
  localStorage.removeItem('token');
  return {
    type: UNAUTH_USER
  };
};

export const fetchMessage = () => {
  return dispatch => {
    axios.get(ROOT_URL, {
			headers: { authorization: localStorage.getItem('token')}
		}).then(response => {
      dispatch({
				type: FETCH_MESSAGE,
				payload: response.data.message
			})
    });
  };
};
