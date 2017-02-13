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
			return Object.assign({},{
				...state,
                gameLog: action.gameLog
			});
		default:
			return state;
	}
} 


