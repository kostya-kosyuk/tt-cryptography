import { ThemeProvider, createTheme } from '@mui/material';
import Auth from './Components/Auth/Auth';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from './store';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { AuthActionTypes } from './store/actions/authAction';
import getCookie from './utils/getCookie';
import { Chat } from './Components/Chat/Chat';
import { useEffect } from 'react';

function App() {
  const dispatch: ThunkDispatch<RootState, null, AnyAction> = useAppDispatch();

  const login = useAppSelector(state => state.auth.login)

  useEffect(() =>{
    if (login === '') {
      const loginFromCookie = getCookie('login');

      if (loginFromCookie) {
        dispatch({
          type: AuthActionTypes.SET_LOGIN,
          payload: {
            login: decodeURIComponent(loginFromCookie),
          },
        });
      }
    }
  }, []);

  return login !== '' ? <Chat /> : <Auth />;
}

export default App;