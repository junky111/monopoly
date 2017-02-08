
import { SET_COLOR, SET_NAME, SET_TYPE, CHANGE_PLAYERS_NUMBER } from '../actions/playerRowActions';
import {colors} from 'config/playerConfig';
const initialState = { players:[] };

function Player(name, color, type){
	this.name 	=	name;
	this.color 	= 	color;
	this.type 	= 	type;
	this.money	=	0;
}

function changePlayerNumber(players, number){
	if(players.length < Number(number)){
		for(let i = players.length ; i < Number(number); i ++){
			players.push(new Player('Player '+i, colors[i], 1));
		}
	} else { 
		let prevLength = players.length;
		players.splice(Number(number), prevLength-number);
	}	

	return players;
}


export default function(state=initialState, action){
	switch (action.type) {
		case SET_COLOR:
			state.players[action.player].color=action.color;
			return {
					...state,
					players:[	
						...state.players.slice(0, action.player),
			    		Object.assign({}, state.players[action.player]),
			    		...state.players.slice(action.player + 1)
  					]
				}
		case SET_NAME:
			state.players[action.player].name=action.name;
			return {
					...state,
					players:[	
						...state.players.slice(0, action.player),
			    		Object.assign({}, state.players[action.player]),
			    		...state.players.slice(action.player + 1)
  					]
				}
		case SET_TYPE:
			state.players[action.player].type=action.type;
			return {
					...state,
					players:[	
						...state.players.slice(0, action.player),
			    		Object.assign({}, state.players[action.player]),
			    		...state.players.slice(action.player + 1)
  					]
				}
		case CHANGE_PLAYERS_NUMBER:
			state.players=changePlayerNumber(state.players,action.number);
			return Object.assign({...state});
		default:
			return state;
	}
} 