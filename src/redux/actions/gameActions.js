export const ROLL_DICE	= 'ROLL_DICE';
export const ADD_ALERT	= 'ADD_ALERT';

export function rollDice(dice){
	console.log('rollDice',dice);
	return {type: ROLL_DICE, dice:dice};
}

export function addAlert(message) {
	return {type: ADD_ALERT, message:message};
}
