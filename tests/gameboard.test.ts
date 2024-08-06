import Ship from '../src/scripts/Ship';
import Gameboard from '../src/scripts/Gameboard';

let board: Gameboard;
beforeEach(() => {
	board = new Gameboard();
});

describe('placeShip tests', () => {
	test('single hit ship is placed correctly', () => {
		let placementMock = jest.fn(() => board.placeShip(0, 0, 1, false));
		placementMock();
		expect(placementMock).toHaveReturned();
	});

	test('invalid single hit placement throws', () => {
		let placementMock = jest.fn(() => board.placeShip(-1, 0, 1, false));
		expect(placementMock).toThrow();
	});

	test('overflow placement throws', () => {
		//overflows on x
		let placementMock = jest.fn(() => board.placeShip(8, 0, 2, false));
		expect(placementMock).toThrow();

		//overflows on y
		placementMock = jest.fn(() => board.placeShip(0, 8, 2, true));
		expect(placementMock).toThrow();
	});

	test('colliding ship placement throws', () => {
		//overflows on x
		let placementMock = jest.fn(() => board.placeShip(3, 3, 2, false));
		placementMock();
		expect(placementMock).toHaveReturned();

		//overflows on y
		placementMock = jest.fn(() => board.placeShip(4, 3, 3, true));
		expect(placementMock).toThrow();
	});
});

describe('Attack tests', () => {
	test('attack is stored', () => {
		expect(board.getAttacks()).toEqual([]);
		board.placeShip(1, 1, 1, false);
		board.receiveAttack(1, 2);
		expect(board.getAttacks()).toEqual([{ x: 1, y: 2, hit: false }]);
		board.receiveAttack(1, 1);
		expect(board.getAttacks()).toEqual([
			{ x: 1, y: 1, hit: true },
			{ x: 1, y: 2, hit: false },
		]);
	});

	test('ships register hits', () => {
		board.placeShip(1, 1, 1, false);
		board.placeShip(2, 2, 1, false);

		expect(board.receiveAttack(0, 0)).toBe(false);
		expect(board.allShipsSunk()).toBe(false);
		expect(board.receiveAttack(1, 1)).toBe(true);
		expect(board.allShipsSunk()).toBe(false);
		expect(board.receiveAttack(2, 2)).toBe(true);
		expect(board.allShipsSunk()).toBe(true);
	});
});
