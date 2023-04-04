import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { loginAction } from './store/asyncActions.ts/authAsyncAction';
import { RootState } from './store';
import { useEffect } from 'react';

function App() {
  const dispatch: ThunkDispatch<RootState, null, AnyAction> = useAppDispatch();
  const isLoading = useAppSelector(state => state.auth.isLoading);
  const login = useAppSelector(state => state.auth.login);
  const errors = useAppSelector(state => state.auth.errorMsg);

  const handleLogin = () => {
    dispatch(loginAction('front1', 'front1'));
  }

  useEffect(() => {
    handleLogin();
  }, []);

  return (
    <>
      {errors.map((err, i) => {
        return (
          <div key={i}>{err}</div>
        );
      })}
      <div>{isLoading ? 'true' : 'false'}</div>
      <div>{login ? login : 'not logged in'}</div>
      <button >ADD</button>
      <button>GET</button>
    </>
  );
}

export default App;