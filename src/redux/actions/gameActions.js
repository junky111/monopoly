export const ROLL_DICE	= 'ROLL_DICE';

export function rollDice(dice){
	return {type: ROLL_DICE, dice:dice};
}
