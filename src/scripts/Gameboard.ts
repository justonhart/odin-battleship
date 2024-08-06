import Ship from './Ship';
export default class Gameboard {
	private board: { ship?: Ship; attacked: boolean }[][];
	private ships: Ship[];

	constructor() {
		this.board = [];
		this.ships = [];
		for (let i = 0; i < 9; i++) {
			this.board[i] = [];
			for (let j = 0; j < 9; j++) {
				this.board[i][j] = { attacked: false };
			}
		}
	}

	/**
	 * Attack a space on the board. If a ship is hit, return true; otherwise false
	 * @returns true if ship was hit; otherwise false
	 */
	public receiveAttack(x: number, y: number): boolean {
		this.board[x][y].attacked = true;
		let thisShip = this.board[x][y].ship;
		if (thisShip) {
			thisShip.hit();
			return true;
		}
		return false;
	}

	/**
	 * Place a new ship on the board, starting at (x,y).
	 * @param x - the x coordinate to place the ship
	 * @param y - the y coordinate to place the ship
	 * @param hits - the number of hits the ship can take (also sets ship length)
	 * @param vertical - if true, the ship is placed parallel to the y-axis, otherwise x-axis
	 */
	public placeShip(
		x: number,
		y: number,
		hits: number,
		vertical: boolean,
	): void {
		let newShip = new Ship(hits);

		//validate that all affected grid spaces are valid for placement
		let isValidPlacement = vertical
			? x >= 0 && y >= 0 && y + (hits - 1) < 10
			: x >= 0 && y >= 0 && x + (hits - 1) < 10;

		if (!isValidPlacement) {
			throw new Error('Invalid placement for ship');
		}

		let allSpacesFree = true;
		for (let i = 0; i < hits; i++) {
			allSpacesFree =
				allSpacesFree &&
				(vertical
					? !this.board[x][y + i].ship
					: !this.board[x + i][y].ship);
		}

		if (!allSpacesFree) {
			throw new Error('Invalid placement for ship');
		}

		for (let i = 0; i < hits; i++) {
			if (vertical) {
				this.board[x][y + i].ship = newShip;
			} else {
				this.board[x + i][y].ship = newShip;
			}
		}
		this.ships.push(newShip);
	}

	/**
	 * Check if all ships on this Gameboard have been sunk.
	 * @returns true if all ships on the board have been sunk; otherwise false.
	 */
	public allShipsSunk(): boolean {
		return this.ships.every((ship: Ship) => ship.isSunk());
	}

	/**
	 * Get list of all attacks made against this gameboard, along with hit status
	 * @returns list of attacks
	 */
	public getAttacks(): { x: number; y: number; hit: boolean }[] {
		const attacks: { x: number; y: number; hit: boolean }[] = [];

		this.board.forEach((row, rowIndex) => {
			row.forEach((cell, cellColumn) => {
				if (cell.attacked) {
					attacks.push({
						x: rowIndex,
						y: cellColumn,
						hit: !!cell.ship,
					});
				}
			});
		});

		return attacks;
	}
}
