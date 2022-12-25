import { UpdateDom } from "./updateDOM.js";
import { Player, GameScore } from "./protocols/protocols.js";

export class TicTacToe {
	private gameScore: GameScore = {
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

	constructor(firstPlayer: Player, private updateDom: UpdateDom) {
		this.acutalPlayer = firstPlayer;
	}

	restartGame() {
		this.board.forEach((_, index) => {
			this.board[index] = "";
		});
		this.numberOfMoves = 0;
		this.updateDom.uncheckSquare();
	}

	checkWinner(player: Player) {
		this.sequences.forEach((_, index) => {
			const thereIsAWinner =
				this.board[this.sequences[index][0]] == player &&
				this.board[this.sequences[index][1]] == player &&
				this.board[this.sequences[index][2]] == player;

			if (thereIsAWinner) {
				this.gameScore[player]++;
				this.updateDom.updateScore(player, this.gameScore);
				this.updateDom.markSquares(this.sequences[index]);
				// this.restartGame();
			} else if (this.numberOfMoves === 9) {
				this.gameScore.ties += 1;
				this.updateDom.updateScore("ties", this.gameScore);
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
		this.updateDom.updateSquare(this.acutalPlayer, position);
		this.invertPlayer();
		console.log(this);
	}
}
