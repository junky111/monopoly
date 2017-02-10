export const ROLL_DICE	= 'ROLL_DICE';

export function rollDice(){
	return {type: ROLL_DICE};
}


export function rollAction(){
	return function(dispatch, getState){
		dispatch(rollDice());
		console.log(getState());
		let data=getState();

		return new Promise(function(resolve, reject){resolve(data.gameFunctionality.dice) } );
	}
}