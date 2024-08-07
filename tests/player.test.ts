import Player from '../src/scripts/Player';

let myPlayer: Player;
let opponent: Player;

beforeEach(() => {
	myPlayer = new Player();
	opponent = new Player();
});

test('makeMove prevents duplicate moves as expected', () => {
	expect(myPlayer.makeMove(opponent, 0, 0)).toBe(true);
	expect(myPlayer.makeMove(opponent, 0, 0)).toBe(false);
});

test('makeMove stores hits as expected', () => {
	opponent.Gameboard.placeShip(1, 0, 3, false);

	myPlayer.makeMove(opponent, 1, 0);

	expect(myPlayer.moveMatrix[1][0]?.hit).toBe(true);
	expect(myPlayer.moveMatrix[1][1]?.hit).toBeFalsy();
});
