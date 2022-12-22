export class TicTacToe {
    constructor(firstPlayer) {
        this.gameScore = {
            X: 0,
            O: 0,
            ties: 0,
        };
        this.numberOfMoves = 0;
        this.board = ["", "", "", "", "", "", "", "", ""];
        this.lines3 = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        // this.firstPlayer = firstPlayer;
        this.acutalPlayer = firstPlayer;
    }
    checkWinner(player) {
        this.lines3.forEach((_, index) => {
            if (this.board[this.lines3[index][0]] == player &&
                this.board[this.lines3[index][1]] == player &&
                this.board[this.lines3[index][2]] == player) {
                return this.gameScore[player]++;
            }
            else if (this.numberOfMoves === 9) {
                this.gameScore.ties++;
            }
        });
    }
    /* 	updateMoves(player: Player, position: number) {
        if (this.board[position] !== "") return;

        this.board[position] = player;
        this.numberOfMoves++;
        this.acutalPlayer === "X" ? "O" : "X";
        this.checkWinner(player);

        // return this.acutalPlayer;
    }
 */
    invertPlayer() {
        this.acutalPlayer === "X"
            ? (this.acutalPlayer = "O")
            : (this.acutalPlayer = "X");
    }
    updateMoves(position) {
        if (this.board[position] !== "")
            return;
        this.board[position] = this.acutalPlayer;
        this.numberOfMoves++;
        this.checkWinner(this.acutalPlayer);
        this.invertPlayer();
        console.log(this);
        // return this.acutalPlayer;
    }
}
// // testes
// const newGame = new TicTacToe("X");
// newGame.updateMoves("X", 0);
// newGame.updateMoves("O", 3);
// newGame.updateMoves("X", 2);
// newGame.updateMoves("O", 4);
// newGame.updateMoves("X", 1);
// console.log(newGame);
