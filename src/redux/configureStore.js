/**
 * Created by avv123avv on 07.02.17.
 * Combine all reducers
 */

import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import counterReducer from './reducers/counterReducer';
import setupReducer from './reducers/setupReducer';

export default function (initialState = {}) {
    const rootReducer = combineReducers({
        counter: counterReducer,
        setup: setupReducer
    });

    return createStore(rootReducer, initialState, applyMiddleware(thunk));
}