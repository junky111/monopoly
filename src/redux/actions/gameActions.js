export const ROLL_DICE	= 'ROLL_DICE';
export const ADD_ALERT	= 'ADD_ALERT';

export function rollDice(dice){
	console.log('rollDice',dice);
	return {type: ROLL_DICE, dice:dice};
}

export function addAlert(alert) {
	console.log('alert',alert);
	return {type: ADD_ALERT, gameLog:alert};
}
