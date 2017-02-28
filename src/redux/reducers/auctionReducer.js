import { 	SHOW_WINDOW_AUCTION, HIDE_WINDOW_AUCTION,
    		SET_HIGHEST_BID, SET_PLAYERS_AUCTION,
    		ADD_PROPERTY_TO_AUCTION_QUEUE, RESET_STATE,
    		EXIT_PLAYERS_AUCTION, SET_C_P_AUCTION,
			UPDATE_CURRENT_PLAYERS_AUCTION} from '../actions/auctionActions';

const initialState = {
	show: false,
	highestBid: {playerId: -1, bid: 0},
	playersAuction: [],
    currentPropertyAuction: 0,
	currentPlayerAuction: 0,
	propertyAuction: []
};

export default function(state = initialState, action){
	switch (action.type) {
		case SHOW_WINDOW_AUCTION:
			return Object.assign({...state, show: true });
		case HIDE_WINDOW_AUCTION:
			return Object.assign({...state, show: false });
		case SET_HIGHEST_BID:
			return Object.assign({...state, highestBid: action.highestBid});
		case ADD_PROPERTY_TO_AUCTION_QUEUE:
            let arr = [];
            let index =-1;
            for(let i in state.propertyAuction)
                if(state.propertyAuction[i] == action.data) {
                    index = i;
                    arr[i] = Object.assign({}, action.data);
                } else
                    arr[i] = Object.assign({}, state.propertyAuction[i]);
                console.log('propertyAuction',state.propertyAuction)
            if(index == -1) {
                state.propertyAuction.push(action.data);
                state.currentPropertyAuction = action.data;
                return Object.assign({}, {...state});
            }
            state.currentPropertyAuction = arr[index];
			return Object.assign({...state, propertyAuction: Object.assign([], arr)});
        case SET_C_P_AUCTION:
            return Object.assign({...state, currentPropertyAuction: action.current});
        case SET_PLAYERS_AUCTION:
        	state.currentPlayerAuction = action.players[0].id;
            return Object.assign({...state, playersAuction: action.players});
		case UPDATE_CURRENT_PLAYERS_AUCTION:
            return Object.assign({...state, currentPlayerAuction: action.current});
		case EXIT_PLAYERS_AUCTION:
            let arr2 = [];
            index = -1;
            for(let i in state.playersAuction)
                if (state.playersAuction[i].id != action.index) {
                    index = i;
                    arr2[i] = Object.assign({}, state.playersAuction[i]);
                }
            state.currentPlayerAuction = index;
            return Object.assign({...state, playersAuction: Object.assign([], arr2)});
		case RESET_STATE:
            return Object.assign({...initialState});
		default:
			return state;
	}
} 