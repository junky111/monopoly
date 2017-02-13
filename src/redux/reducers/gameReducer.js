import { ROLL_DICE, ADD_ALERT } from '../actions/gameActions';


const initialState = { playerToSquare: {}, currentPlayer: 0, dice: {}, gameLog:[]};



export default function(state=initialState, action){
	switch (action.type) {
		case ROLL_DICE:
			return Object.assign({},{ 
				...state, 
				dice: action.dice
			});
		case ADD_ALERT:
				state.gameLog.push(action.message);
				return Object.assign({},{...state});
		default:
			return state;
	}
} 


