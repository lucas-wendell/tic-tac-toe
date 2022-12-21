export class TicTacToe {
	private gameScore = {
		X: 0,
		O: 0,
		ties: 0,
	};
	private numberOfMoves = 0;
	private board = ["", "", "", "", "", "", "", "", ""];
	private lines3 = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	checkWinner(player: "X" | "O") {
		this.lines3.forEach((_, index) => {
			if (
				this.board[this.lines3[index][0]] == player &&
				this.board[this.lines3[index][1]] == player &&
				this.board[this.lines3[index][2]] == player
			) {
				return this.gameScore[player]++;
			} else if (this.numberOfMoves === 9) {
				this.gameScore.ties++;
			}
		});
	}

	updateMoves(player: "X" | "O", position: number) {
		if (this.board[position] !== "") return;

		this.board[position] = player;
		this.numberOfMoves++;
		this.checkWinner(player);
	}
}

// testes
const newGame = new TicTacToe();
newGame.updateMoves("X", 0);
newGame.updateMoves("O", 3);
newGame.updateMoves("X", 2);
newGame.updateMoves("O", 4);
newGame.updateMoves("X", 1);
console.log(newGame);
