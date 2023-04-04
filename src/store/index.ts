import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import { authReducer } from './reducers/authReducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    auth: authReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;