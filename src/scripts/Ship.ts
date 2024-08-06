export default class Ship {
	private maxHits: number;
	private hits: number;

	constructor(hits: number) {
		this.maxHits = hits;
		this.hits = 0;
	}

	public hit(): void {
		this.hits++;
	}

	public isSunk(): boolean {
		return this.hits >= this.maxHits;
	}
}
