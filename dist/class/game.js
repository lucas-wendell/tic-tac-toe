export class TicTacToe {
    constructor(firstPlayer, updateDom) {
        this.updateDom = updateDom;
        this.gameScore = {
            X: 0,
            O: 0,
            ties: 0,
        };
        this.numberOfMoves = 0;
        this.board = ["", "", "", "", "", "", "", "", ""];
        this.sequences = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        this.isThereAWinner = false;
        this.acutalPlayer = firstPlayer;
    }
    restartGame() {
        this.board.forEach((_, index) => {
            this.board[index] = "";
        });
        this.numberOfMoves = 0;
        this.updateDom.uncheckSquare();
    }
    checkWinner(player) {
        this.sequences.forEach((_, index) => {
            const thereIsAWinner = this.board[this.sequences[index][0]] == player &&
                this.board[this.sequences[index][1]] == player &&
                this.board[this.sequences[index][2]] == player;
            if (thereIsAWinner) {
                this.gameScore[player]++;
                this.updateDom.updateScore(player, this.gameScore);
                this.updateDom.markSquares(this.sequences[index]);
                this.updateDom.showModal(player);
                this.isThereAWinner = true;
                this.acutalPlayer = player;
            }
        });
        if (this.numberOfMoves === 9 && this.isThereAWinner === false) {
            this.gameScore.ties += 1;
            this.updateDom.updateScore("ties", this.gameScore);
            this.updateDom.showModal("ties");
            return false;
        }
    }
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
        this.updateDom.updateSquare(this.acutalPlayer, position);
        this.invertPlayer();
        console.log(this);
    }
}
