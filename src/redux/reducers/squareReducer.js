import {squares} from 'config/squareConfig';

const initialState = { squares: squares };

export default function(state=initialState, action){
	switch (action.type) {
		default:
			return state;
	}
} 