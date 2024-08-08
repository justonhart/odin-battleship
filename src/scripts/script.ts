import '../style.css';
import Player from './Player';

let isPlayerGame: boolean;
const gameboardElement = document.querySelector('.gameboard') as HTMLDivElement;

let players: Player[] = [];
players.push(new Player());
players.push(new Player());

let currentPlayerIndex = 0;

drawGameboard(currentPlayerIndex);

/**
 * Render a player's moveMatrix inside the Gameboard element
 */
function drawGameboard(playerIndex: number): void {
	gameboardElement.innerHTML = '';
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			let space = document.createElement('div');
			space.classList.add('space');
			space.dataset.row = i.toString();
			space.dataset.col = j.toString();

			let spaceData = players[playerIndex].moveMatrix[i][j];
			if (spaceData) {
				if (spaceData.hit) {
					space.innerText = '💥';
					space.classList.add('hit');
				} else {
					space.classList.add('miss');
				}
			}
			gameboardElement.appendChild(space);
		}
	}
}

addEventListener('click', (event: Event) => {
	if (
		event.target instanceof HTMLDivElement &&
		event.target.classList.contains('space')
	) {
		let targetPlayer = players[(currentPlayerIndex + 1) % 2];
		let x = parseInt(event.target.dataset.row);
		let y = parseInt(event.target.dataset.col);
		players[currentPlayerIndex].makeMove(targetPlayer, x, y);
		drawGameboard(currentPlayerIndex);
	}
});
