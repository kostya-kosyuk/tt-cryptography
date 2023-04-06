import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import { authReducer } from './reducers/authReducer';
import thunk from 'redux-thunk';
import { messagesReducer } from './reducers/messageReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    messages: messagesReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;