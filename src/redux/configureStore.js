/**
 * Created by avv123avv on 07.02.17.
 * Combine all reducers
 */

import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import counterReducer from './reducers/counterReducer';
import setupReducer from './reducers/setupReducer';
import playerRowReducer from './reducers/playerRowReducer';
import squareReducer from './reducers/squareReducer';

export default function (initialState = {}) {
    const rootReducer = combineReducers({
        counter: counterReducer,
        setup: setupReducer,
        playersConfig: playerRowReducer, 
        squareConfig: squareReducer
    });

    return createStore(rootReducer, initialState, applyMiddleware(thunk));
}