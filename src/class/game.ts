import { html } from "../getHtml.js";

export type Player = "X" | "O";
export class TicTacToe {
	private gameScore = {
		X: 0,
		O: 0,
		ties: 0,
	};
	private numberOfMoves = 0;
	private board = ["", "", "", "", "", "", "", "", ""];
	private readonly sequences = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	private acutalPlayer: Player;

	constructor(firstPlayer: Player, private readonly scoreboard: Element[]) {
		this.acutalPlayer = firstPlayer;
	}

	updateScore(player: Player) {
		const [winner] = this.scoreboard.filter(
			(item) => item.getAttribute("data-value") === player,
		);
		const paragraphScore = html.get(".score", winner);
		paragraphScore.textContent = this.gameScore[player].toString();
	}

	checkWinner(player: Player) {
		this.sequences.forEach((_, index) => {
			if (
				this.board[this.sequences[index][0]] == player &&
				this.board[this.sequences[index][1]] == player &&
				this.board[this.sequences[index][2]] == player
			) {
				this.gameScore[player]++;
				this.updateScore(player);
			} else if (this.numberOfMoves === 9) {
				this.gameScore.ties++;
			}
		});
	}

	invertPlayer() {
		this.acutalPlayer === "X"
			? (this.acutalPlayer = "O")
			: (this.acutalPlayer = "X");
	}

	updateMoves(position: number) {
		if (this.board[position] !== "") return;

		this.board[position] = this.acutalPlayer;
		this.numberOfMoves++;

		this.checkWinner(this.acutalPlayer);
		this.invertPlayer();
		console.log(this);
	}
}
