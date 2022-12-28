import { UpdateDom } from "./updateDOM.js";
import { Player, GameScore } from "./protocols/protocols.js";

export class TicTacToe {
	private acutalPlayer: Player;
	private isThereAWinner = false;

	private numberOfMoves = 0;
	private readonly board = ["", "", "", "", "", "", "", "", ""];

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
	private gameScore: GameScore = {
		X: 0,
		O: 0,
		ties: 0,
	};

	constructor(firstPlayer: Player, private updateDom: UpdateDom) {
		this.acutalPlayer = firstPlayer;
		this.updateDom.updateTurnDiv(this.acutalPlayer);
	}

	private restartBoard(): void {
		this.board.forEach((_, index) => {
			this.board[index] = "";
		});
	}

	restartRound() {
		this.restartBoard();
		this.updateDom.uncheckSquare();
	}

	restartGame(): void {
		this.invertPlayer();
		this.restartBoard();
		this.isThereAWinner = false;
		this.numberOfMoves = 0;
		this.updateDom.uncheckSquare();
		this.updateDom.updateTurnDiv(this.acutalPlayer);
	}

	private handleOnTies(): void {
		this.gameScore.ties++;
		this.updateDom.updateScore("ties", this.gameScore);
		this.updateDom.showModal("ties");
		this.isThereAWinner = false;
	}

	private handleOnVictory(player: Player, sequenceIndex: number): void {
		this.gameScore[player]++;
		this.updateDom.updateScore(player, this.gameScore);
		this.updateDom.markSquares(this.sequences[sequenceIndex]);
		this.updateDom.showModal(player);
		this.isThereAWinner = true;
	}

	private checkWinner(player: Player): void {
		this.sequences.forEach((_, index) => {
			const thereIsAWinner =
				this.board[this.sequences[index][0]] == player &&
				this.board[this.sequences[index][1]] == player &&
				this.board[this.sequences[index][2]] == player;

			if (thereIsAWinner) {
				this.handleOnVictory(player, index);
			}
		});

		if (this.numberOfMoves === 9 && this.isThereAWinner === false) {
			this.handleOnTies();
		}
	}

	private invertPlayer(): void {
		this.acutalPlayer === "X"
			? (this.acutalPlayer = "O")
			: (this.acutalPlayer = "X");
	}

	updateMoves(position: number): void {
		if (this.board[position] !== "") return;

		this.board[position] = this.acutalPlayer;
		this.numberOfMoves++;

		this.checkWinner(this.acutalPlayer);
		this.updateDom.updateSquare(this.acutalPlayer, position);
		this.invertPlayer();
		this.updateDom.updateTurnDiv(this.acutalPlayer);
	}
}
