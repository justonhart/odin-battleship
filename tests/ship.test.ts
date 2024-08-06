import Ship from '../src/scripts/Ship';

let myShip: Ship;
beforeEach(() => {
	myShip = new Ship(1);
});

test('new ship is not sunk', () => {
	expect(myShip.isSunk()).toBe(false);
});

test('new ship is sunk after one hit', () => {
	myShip.hit();
	expect(myShip.isSunk()).toBe(true);
});
