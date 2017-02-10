import { ROLL_DICE } from '../actions/gameActions';
import { rollDice } from './acts/gameActs';

const initialState = { playerToSquare: {}, currentPlayer: 0, dice: {}, gameLog:[]};



export default function(state=initialState, action){
	switch (action.type) {
		case ROLL_DICE: 

			let dice=rollDice();
			return Object.assign({},{ 
				...state, 
				dice: dice
			})
		default:
			return state;
	}
} 


