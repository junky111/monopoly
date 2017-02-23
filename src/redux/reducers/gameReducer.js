import { ROLL_DICE, ADD_ALERT, SET_NEXT_BUTTON, SET_LANDED, UPDATE_P_S, UPDATE_P_C, SET_P_S } from '../actions/gameActions';


const initialState = { 
	playerToSquare: [],
	currentPlayer: 0,
	dice: {},
	gameLog:[],
	nextButton:{title:'', text:'', show: false},
	landed: {text:'', show: false}
};



export default function(state=initialState, action){
	switch (action.type) {
		case ROLL_DICE:
			return Object.assign({},{ 
				...state, 
				dice: action.dice
			});
		case ADD_ALERT:
				state.gameLog.unshift(action.message);
				return Object.assign({},{...state});
		case SET_NEXT_BUTTON: 
			return Object.assign({}, {
				...state,
			 	nextButton: Object.assign({},{...state.nextButton, ...action.nextButton})
			})
		case SET_LANDED: 
			return Object.assign({}, {
				...state,
			 	landed: action.landed
			})
		case UPDATE_P_C:
            state.currentPlayer = action.currentPlayer;
			return Object.assign({}, {...state})
		case SET_P_S:
			if(state.playerToSquare.length < 1) {
                let players = [];
                for (let i = 0; i < action.playerToSquare.players.length; i++) {
                    players.push({
                        player: i,
                        square: 0
                    })
                }
                return Object.assign({}, {
                    ...state,
                    playerToSquare: players
                })
            }
            return state;
		case UPDATE_P_S: 
			let playerToSquare = state.playerToSquare;
			let index=-1;
			for(let i in playerToSquare){
				if(playerToSquare[i].player==action.playerToSquare.player)
					index=i;
			}

            if(index == -1) {
                state.playerToSquare.push(action.playerToSquare);
                return Object.assign({}, {...state});
			} else if(index < playerToSquare.length-1)
				return  Object.assign({},{
					...state,
					playerToSquare:[	
						...state.playerToSquare.slice(0, index),
			    		Object.assign({}, action.playerToSquare),
			    		...state.playerToSquare.slice(index + 1)
  					]
				});
			else 
				return  Object.assign({},{
					...state,
					playerToSquare:[
						...state.playerToSquare.slice(0, index),
			    		Object.assign({}, action.playerToSquare)
  					]
				});
		default:
			return state;
	}
} 

