

export function rollDice(){
	let first  = Math.floor(Math.random() * 6) + 1;
	let second = Math.floor(Math.random() * 6) + 1;

	return { first, second };
}