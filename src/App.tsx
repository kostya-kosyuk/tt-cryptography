import { ThemeProvider, createTheme } from '@mui/material';
import Auth from './Components/Auth/Auth';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from './store';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { AuthActionTypes } from './store/actions/authAction';
import getCookie from './utils/getCookie';
import { Chat } from './Components/Chat/Chat';

function App() {
  const dispatch: ThunkDispatch<RootState, null, AnyAction> = useAppDispatch();
  const theme = createTheme({
    palette: {
      primary: {
        main: '#2196f3',
      },
      secondary: {
        main: '#f50057',
      },
    },
  });

  const login = useAppSelector(state => state.auth.login)

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

  return (
    <ThemeProvider theme={theme}>
      {login
        ? <Chat />
        : <Auth />}
    </ThemeProvider>
  );
}

export default App;