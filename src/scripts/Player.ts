import Gameboard from './Gameboard';
export default class Player {
	public readonly Gameboard: Gameboard;
	public readonly moveMatrix: { hit: boolean }[][];
	public readonly isAi: boolean;

	constructor(isAi: boolean = false) {
		this.Gameboard = new Gameboard();
		this.moveMatrix = [];
		this.isAi = isAi;
		for (let i = 0; i < 9; i++) this.moveMatrix[i] = [];
	}

	/**
	 * Players can attack each space only once. If move is valid, make move against opponent, store hit value, and return true; otherwise false.
	 */
	public makeMove(targetPlayer: Player, x: number, y: number): boolean {
		if (
			x >= 0 &&
			y >= 0 &&
			x <= 8 &&
			y <= 8 &&
			this.moveMatrix[x][y] === undefined
		) {
			this.moveMatrix[x][y] = {
				hit: targetPlayer.Gameboard.receiveAttack(x, y),
			};
			return true;
		}
		return false;
	}
}
